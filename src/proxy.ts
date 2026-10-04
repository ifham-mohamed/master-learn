import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

// A personal deployment uses one shared password; this is not a multi-user account system.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/health") return NextResponse.next();
  const password = process.env.APP_ACCESS_PASSWORD || "";
  const origin = process.env.APP_ORIGIN || "http://localhost:3100";
  let local = false;
  try {
    local = ["localhost", "127.0.0.1", "[::1]"].includes(
      new URL(origin).hostname,
    );
  } catch {}
  const headers = { "Cache-Control": "no-store" };
  if (!password && local && process.env.RENDER !== "true")
    return NextResponse.next();
  if (password.length < 20)
    return new NextResponse(
      "Set APP_ACCESS_PASSWORD to a unique password of at least 20 characters before opening this hosted app.",
      { status: 503, headers },
    );
  const auth = request.headers.get("authorization") || "";
  if (auth.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.slice(6), "base64").toString("utf8");
    const expected = `learner:${password}`;
    const hash = (value: string) => createHash("sha256").update(value).digest();
    if (timingSafeEqual(hash(decoded), hash(expected)))
      return NextResponse.next();
  }
  return new NextResponse(
    "Sign in with username learner and your private app password.",
    {
      status: 401,
      headers: {
        ...headers,
        "WWW-Authenticate": 'Basic realm="Learning Atlas", charset="UTF-8"',
      },
    },
  );
}

export const config = { matcher: "/:path*" };
