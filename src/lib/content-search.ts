import { tasks } from "./tracker";
import { getLearningManifest, readLearningDocument } from "./learning-files";
export type SearchEntry = {
  id: string;
  title: string;
  path: string;
  section: string;
  text: string;
};
export async function buildSearchIndex() {
  const index: SearchEntry[] = [];
  for (const task of tasks) {
    const manifest = await getLearningManifest(task.id);
    for (const file of manifest.files) {
      if (["image", "pdf"].includes(file.kind) || file.bytes > 1024 * 1024)
        continue;
      const doc = await readLearningDocument(task.id, file.path);
      index.push({
        id: task.id,
        title: task.title,
        path: file.path,
        section: file.section,
        text: doc.content,
      });
    }
  }
  return index;
}
