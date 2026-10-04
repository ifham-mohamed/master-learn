import { lstat, readdir, readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { tasks, slug } from "./tracker";
import {
  contentSections,
  type ContentKind,
  type ContentSection,
  type LearningFile,
  type LearningManifest,
} from "./learning-types";

export const LEARNING_ROOT = path.join(process.cwd(), "learning");
export const MAX_TEXT_BYTES = 1024 * 1024;
const MAX_FILES = 500;
const MAX_DEPTH = 8;
const skipped = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  "__pycache__",
  ".venv",
  "venv",
]);
const codeExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".java",
  ".py",
  ".sql",
  ".css",
  ".scss",
  ".json",
  ".yaml",
  ".yml",
  ".xml",
  ".sh",
  ".ps1",
  ".go",
  ".rs",
  ".c",
  ".cpp",
  ".h",
  ".cs",
  ".kt",
  ".vue",
  ".svelte",
  ".toml",
  ".csv",
]);
export class LearningError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function contentKind(name: string): ContentKind | null {
  if (name.startsWith(".")) return null;
  const extension = path.extname(name).toLowerCase();
  if ([".md", ".markdown"].includes(extension)) return "markdown";
  if ([".html", ".htm"].includes(extension)) return "html";
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"].includes(extension))
    return "image";
  if (extension === ".pdf") return "pdf";
  if (
    codeExtensions.has(extension) ||
    name === "Dockerfile" ||
    name === "Makefile"
  )
    return "code";
  if ([".txt", ".log"].includes(extension)) return "text";
  return null;
}
function within(root: string, candidate: string) {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) &&
      relative !== ".." &&
      !path.isAbsolute(relative))
  );
}
export function taskFolder(id: string) {
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new LearningError("Unknown learning task.", 404);
  return `${slug(task.category)}/${task.id}`;
}
async function rootFor(id: string, root: string) {
  const candidate = path.resolve(root, taskFolder(id));
  // Do not follow symbolic links or junctions, including category/task folders.
  for (const target of [root, path.dirname(candidate), candidate]) {
    try {
      if ((await lstat(target)).isSymbolicLink())
        throw new LearningError("Linked folders are not served.", 403);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT")
        throw new LearningError(
          "Learning folder not found. Run npm run learning:init.",
          404,
        );
      throw error;
    }
  }
  const actual = await realpath(candidate);
  if (!within(await realpath(root), actual))
    throw new LearningError("Invalid learning folder.", 403);
  return actual;
}
export async function resolveLearningFile(
  id: string,
  relative: string,
  root = LEARNING_ROOT,
) {
  if (
    !relative ||
    relative.includes("\\") ||
    relative.includes("\0") ||
    relative
      .split("/")
      .some(
        (p) =>
          !p || p === "." || p === ".." || p.startsWith(".") || p.includes(":"),
      )
  )
    throw new LearningError("Invalid file path.");
  const pieces = relative.split("/");
  if (
    !contentSections.includes(pieces[0] as ContentSection) ||
    pieces.length < 2 ||
    !contentKind(pieces[pieces.length - 1])
  )
    throw new LearningError("Unsupported learning file.", 404);
  const folder = await rootFor(id, root);
  let candidate = folder;
  for (const piece of pieces) {
    if (skipped.has(piece))
      throw new LearningError("Generated files are excluded.", 404);
    candidate = path.join(candidate, piece);
    try {
      if ((await lstat(candidate)).isSymbolicLink())
        throw new LearningError("Linked files are not served.", 403);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT")
        throw new LearningError("File no longer exists.", 404);
      throw error;
    }
  }
  const actual = await realpath(candidate);
  if (!within(folder, actual) || !(await stat(actual)).isFile())
    throw new LearningError("Invalid learning file.", 404);
  return actual;
}
function fileInfo(
  relative: string,
  size: number,
  modified: Date,
): LearningFile {
  return {
    path: relative,
    name: path.posix.basename(relative),
    section: relative.split("/")[0] as ContentSection,
    kind: contentKind(relative)!,
    bytes: size,
    modified: modified.toISOString(),
    revision: `${size}-${modified.getTime()}`,
  };
}
export async function getLearningManifest(
  id: string,
  root = LEARNING_ROOT,
): Promise<LearningManifest> {
  const folder = await rootFor(id, root);
  const files: LearningFile[] = [];
  const warnings: string[] = [];
  async function walk(directory: string, relative: string, depth: number) {
    if (depth > MAX_DEPTH) {
      warnings.push(`Skipped deeply nested folder: ${relative}`);
      return;
    }
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
      throw error;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.name.startsWith(".") || skipped.has(entry.name)) continue;
      if (entry.isSymbolicLink()) {
        warnings.push(
          `Skipped linked file or folder: ${relative}/${entry.name}`,
        );
        continue;
      }
      if (files.length >= MAX_FILES) {
        if (!warnings.includes("Showing the first 500 supported files."))
          warnings.push("Showing the first 500 supported files.");
        return;
      }
      const next = `${relative}/${entry.name}`;
      if (entry.isDirectory())
        await walk(path.join(directory, entry.name), next, depth + 1);
      else if (entry.isFile() && contentKind(entry.name)) {
        try {
          const details = await stat(path.join(directory, entry.name));
          files.push(fileInfo(next, details.size, details.mtime));
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        }
      }
    }
  }
  for (const section of contentSections) {
    const sectionPath = path.join(folder, section);
    try {
      if ((await lstat(sectionPath)).isSymbolicLink()) {
        warnings.push(`Skipped linked section: ${section}`);
        continue;
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    await walk(sectionPath, section, 0);
  }
  const revision = createHash("sha256")
    .update(JSON.stringify(files))
    .digest("hex");
  return {
    taskId: id,
    folder: `learning/${taskFolder(id)}`,
    files,
    revision,
    warnings,
  };
}
export async function readLearningDocument(
  id: string,
  relative: string,
  root = LEARNING_ROOT,
) {
  const absolute = await resolveLearningFile(id, relative, root);
  const details = await stat(absolute);
  const file = fileInfo(relative, details.size, details.mtime);
  if (["image", "pdf"].includes(file.kind))
    throw new LearningError("Use the file preview URL for this format.");
  if (details.size > MAX_TEXT_BYTES)
    throw new LearningError(
      "This file is larger than the 1 MB text preview limit. Open it in your editor.",
      413,
    );
  return { file, content: await readFile(absolute, "utf8") };
}
