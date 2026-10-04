import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { tasks } from "../src/lib/tracker";
import {
  getLearningManifest,
  readLearningDocument,
  resolveLearningFile,
} from "../src/lib/learning-files";
import { staticFilePath } from "../src/lib/deployment";

export async function exportLearning(destination: string) {
  let count = 0;
  for (const task of tasks) {
    const manifest = await getLearningManifest(task.id);
    manifest.files = manifest.files.filter((file) => {
      if (file.bytes <= 20 * 1024 * 1024) return true;
      manifest.warnings.push(`Not published: ${file.path} exceeds 20 MB.`);
      return false;
    });
    const directory = path.join(destination, "learning-data", task.id);
    await mkdir(directory, { recursive: true });
    for (const file of manifest.files) {
      const raw = path.join(
        destination,
        staticFilePath(task.id, file.path, true),
      );
      await mkdir(path.dirname(raw), { recursive: true });
      await copyFile(await resolveLearningFile(task.id, file.path), raw);
      if (!["image", "pdf"].includes(file.kind)) {
        const document = path.join(
          destination,
          staticFilePath(task.id, file.path),
        );
        await mkdir(path.dirname(document), { recursive: true });
        const data =
          file.bytes > 1024 * 1024
            ? {
                error:
                  "This file exceeds the 1 MB preview limit. Download it to read locally.",
              }
            : await readLearningDocument(task.id, file.path);
        await writeFile(document, JSON.stringify(data));
      }
      count++;
    }
    await writeFile(
      path.join(directory, "manifest.json"),
      JSON.stringify(manifest),
    );
  }
  console.log(
    `Published ${count} learning files across ${tasks.length} tasks.`,
  );
}
