import { buildSearchIndex } from "@/lib/content-search";
export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json(await buildSearchIndex());
}
