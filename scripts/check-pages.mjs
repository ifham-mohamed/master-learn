import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const base = process.env.PAGES_BASE_PATH ?? "/master-learn";
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(dir, entry.name))
          : [path.join(dir, entry.name)],
      ),
    )
  ).flat();
}
const files = await walk(root);
const pages = files.filter((file) => file.endsWith(".html"));
const missing = new Set();
const checked = new Set();
for (const file of pages) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (checked.has(url)) continue;
    checked.add(url);
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    if (base && !url.startsWith(base + "/") && url !== base) {
      missing.add(`Missing base path: ${url}`);
      continue;
    }
    const target = path.join(root, decodeURIComponent(url.slice(base.length)));
    try {
      const info = await stat(target);
      if (info.isDirectory()) await stat(path.join(target, "index.html"));
    } catch {
      missing.add(`Missing file: ${url}`);
    }
  }
}
for (const file of files) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (/(^|\/)(\.env[^/]*|\.local|api)(\/|$)/.test(relative))
    throw new Error(`Unexpected private/server file: ${relative}`);
}
if (missing.size) throw new Error([...missing].join("\n"));
console.log(
  `Verified ${pages.length} static pages, local HTML asset/link targets, and absence of server/environment files.`,
);
