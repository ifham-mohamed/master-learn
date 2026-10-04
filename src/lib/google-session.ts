import { randomBytes, createHash } from "node:crypto";
import path from "node:path";
import { SessionStore } from "./google-session-store";
import type { SheetChange } from "./sheet-sync";

export const scope = "https://www.googleapis.com/auth/spreadsheets";
export const cookieName = "learnspace_google";
export const transactionCookie = "learnspace_google_login";
export const sessionDuration = 30 * 24 * 60 * 60 * 1000;
export type Session = {
  kind: "session";
  expires: number;
  origin: string;
  accessToken: string;
  refreshToken: string;
  accessExpires: number;
  pending?: { changes: SheetChange[]; localHash: string; expires: number };
};
export type Transaction = {
  kind: "login";
  expires: number;
  state: string;
  verifier: string;
  origin: string;
};
export class AuthError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function config() {
  const clientId =
    process.env.GOOGLE_CLIENT_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  const key = process.env.GOOGLE_SESSION_KEY || "";
  const origin = process.env.APP_ORIGIN || "http://localhost:3100";
  const url = new URL(origin);
  if (
    url.origin !== origin ||
    (url.protocol !== "https:" &&
      !(
        url.protocol === "http:" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
      ))
  )
    throw new AuthError(
      "APP_ORIGIN must be an HTTPS origin or a local development origin.",
      503,
    );
  const missing = [
    !clientId && "Google client ID",
    !clientSecret && "GOOGLE_CLIENT_SECRET",
    !/^[a-f0-9]{64}$/i.test(key) && "GOOGLE_SESSION_KEY",
  ].filter(Boolean) as string[];
  return {
    clientId,
    clientSecret,
    key,
    origin,
    missing,
    redirectUri: `${origin}/api/google/callback`,
  };
}
export function store() {
  const settings = config();
  if (settings.missing.length)
    throw new AuthError("Complete secure Google connection setup first.", 503);
  return new SessionStore(
    process.env.GOOGLE_SESSION_DIR ||
      path.join(process.cwd(), ".local", "google-sessions"),
    Buffer.from(settings.key, "hex"),
  );
}
export function newId() {
  return randomBytes(32).toString("hex");
}
export function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: config().origin.startsWith("https:"),
    path: "/",
    maxAge,
  };
}
export function requireOrigin(request: Request) {
  if (request.headers.get("origin") !== config().origin)
    throw new AuthError(
      "Open the app at its configured address before using Google sync.",
      403,
    );
}
type TokenResult = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  error?: string;
};
export async function tokens(
  parameters: Record<string, string>,
): Promise<TokenResult> {
  const settings = config();
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      ...parameters,
      client_id: settings.clientId,
      client_secret: settings.clientSecret,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const result = (await response.json()) as TokenResult;
  if (!response.ok || !result.access_token)
    throw new AuthError(
      result.error === "invalid_grant"
        ? "Google access expired or was revoked. Connect again."
        : "Google could not authorize the connection. Check the client secret and callback URL.",
      401,
    );
  return result;
}
export async function access(id: string, session: Session) {
  if (session.accessExpires > Date.now() + 60000) return session.accessToken;
  try {
    const result = await tokens({
      grant_type: "refresh_token",
      refresh_token: session.refreshToken,
    });
    session.accessToken = result.access_token!;
    session.accessExpires = Date.now() + (result.expires_in || 3600) * 1000;
    if (result.refresh_token) session.refreshToken = result.refresh_token;
    await store().write(id, session);
    return session.accessToken;
  } catch (error) {
    if (error instanceof AuthError && error.status === 401)
      await store().remove(id);
    throw error;
  }
}
