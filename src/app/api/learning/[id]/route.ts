import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import {
  getLearningManifest,
  LearningError,
  readLearningDocument,
  resolveLearningFile,
} from "@/lib/learning-files";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const url = new URL(request.url);
    const relative = url.searchParams.get("path");
    if (!relative)
      return Response.json(await getLearningManifest(id), { headers });
    if (url.searchParams.get("raw") === "1") {
      const file = await resolveLearningFile(id, relative);
      if ((await stat(file)).size > 20 * 1024 * 1024)
        throw new LearningError("File exceeds the 20 MB download limit.", 413);
      const mime: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".avif": "image/avif",
        ".pdf": "application/pdf",
      };
      const type = mime[path.extname(file).toLowerCase()];
      return new Response(await readFile(file), {
        headers: {
          ...headers,
          "Content-Type": type || "text/plain; charset=utf-8",
          "Content-Disposition": `${type && type !== "application/pdf" ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(path.basename(file))}`,
          "Content-Security-Policy": "default-src 'none'; sandbox",
        },
      });
    }
    return Response.json(await readLearningDocument(id, relative), { headers });
  } catch (error) {
    const known = error instanceof LearningError;
    if (!known) console.error("Learning content read failed:", error);
    return Response.json(
      {
        error: known
          ? error.message
          : "Could not read the learning files. Try refreshing.",
      },
      { status: known ? error.status : 500, headers },
    );
  }
}
