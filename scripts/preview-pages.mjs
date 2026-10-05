import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const base = process.env.PAGES_BASE_PATH ?? "/master-learn";
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (base && pathname !== base && !pathname.startsWith(base + "/"))
      throw new Error("Not found");
    let file = path.resolve(root, "." + (pathname.slice(base.length) || "/"));
    if (file !== root && !file.startsWith(root + path.sep))
      throw new Error("Not found");
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith("/")) {
        response.writeHead(308, { Location: url.pathname + "/" + url.search });
        response.end();
        return;
      }
      file = path.join(file, "index.html");
    }
    response.setHeader(
      "Content-Type",
      types[path.extname(file)] || "application/octet-stream",
    );
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.end(await readFile(file));
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
  }
}).listen(3200, "localhost", () =>
  console.log(`Static Pages preview: http://localhost:3200${base}/`),
);
