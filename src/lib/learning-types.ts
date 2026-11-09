import { isGitHubPages, assetUrl, staticFilePath } from "./deployment";
import { slug, tasks } from "./tracker";
export const learningLogPath = "notes/journal.md";
export const taskGuidePath = "README.md";

export const contentSections = [
  "theory",
  "notes",
  "code",
  "results",
  "resources",
] as const;
export type ContentSection = (typeof contentSections)[number];
export type ContentKind =
  "markdown" | "code" | "html" | "image" | "pdf" | "text";
export type LearningFile = {
  path: string;
  name: string;
  section: ContentSection;
  kind: ContentKind;
  bytes: number;
  modified: string;
  revision: string;
};
export type LearningManifest = {
  taskId: string;
  folder: string;
  files: LearningFile[];
  revision: string;
  warnings: string[];
};
export type LearningDocument = { file: LearningFile; content: string };
export function learningFileUrl(id: string, path: string, raw = false) {
  if (isGitHubPages) return assetUrl(staticFilePath(id, path, raw));
  return `/api/learning/${encodeURIComponent(id)}?path=${encodeURIComponent(path)}${raw ? "&raw=1" : ""}`;
}
export function learningManifestUrl(id: string) {
  return isGitHubPages
    ? assetUrl(`/learning-data/${encodeURIComponent(id)}/manifest.json`)
    : `/api/learning/${encodeURIComponent(id)}`;
}

export function resolveGuideReference(taskId: string, current: string, href: string) {
  if (current !== taskGuidePath) return null;
  const task = tasks.find((entry) => entry.id === taskId);
  if (!task) return null;
  const track = slug(task.category);
  if (href === "../../../projects/warehouse-dispatch/README.md")
    return assetUrl("/projects/#project-requirements");
  if (href === "../../../sources/markdown/categories/practice-bank.md")
    return assetUrl("/practice/");
  const sourceRecord = `sources/markdown/categories/${track}.md#${task.id.toLowerCase()}`;
  const workbook = "sources/Final%20Tracker.xlsx";
  const source = [sourceRecord, workbook].find((path) => href === `../../../${path}`);
  if (source) return `https://github.com/ifham-mohamed/master-learn/blob/main/${source}`;
  const match = /^\.\.\/(?:\.\.\/([a-z0-9-]+)\/)?([A-Z]+\d+)\/README\.md$/.exec(href);
  if (!match) return null;
  const target = tasks.find((entry) => entry.id === match[2] && slug(entry.category) === (match[1] ?? track));
  return target ? assetUrl(`/tasks/${target.id}/?file=${taskGuidePath}#learning-files`) : null;
}

/** Resolve relative document links against the selected file, confined to its task. */
export function resolveLearningLink(
  current: string,
  href: string,
): string | null {
  if (
    !href ||
    /^[a-z][a-z\d+.-]*:/i.test(href) ||
    href.startsWith("/") ||
    href.includes("\\")
  )
    return null;
  const parts = current.split("/").slice(0, -1);
  let decoded: string;
  try {
    decoded = decodeURIComponent(href.split(/[?#]/)[0]);
  } catch {
    return null;
  }
  for (const part of decoded.split("/")) {
    if (part === "..") {
      if (!parts.length) return null;
      parts.pop();
    } else if (part && part !== ".") parts.push(part);
  }
  return parts.join("/");
}
