import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash, timingSafeEqual } from "node:crypto";
import {
  access,
  AuthError,
  config,
  cookieName,
  cookieOptions,
  digest,
  newId,
  requireOrigin,
  scope,
  sessionDuration,
  store,
  tokens,
  transactionCookie,
  type Session,
  type Transaction,
} from "@/lib/google-session";
import {
  planSheetChanges,
  readMasterPlan,
  sheetsRequest,
} from "@/lib/sheet-sync";
import { validateProgress, type Progress } from "@/lib/progress";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
};
const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers });
function equal(a: string, b: string) {
  return (
    Buffer.byteLength(a) === Buffer.byteLength(b) &&
    timingSafeEqual(Buffer.from(a), Buffer.from(b))
  );
}
async function sessionFor(request: NextRequest) {
  const id = request.cookies.get(cookieName)?.value || "";
  const session = await store().read<Session>(id);
  if (
    !session ||
    session.kind !== "session" ||
    session.origin !== config().origin
  )
    throw new AuthError("Connect to Google to continue.", 401);
  return { id, session };
}
function failure(error: unknown) {
  return json(
    {
      error:
        error instanceof AuthError
          ? error.message
          : "The Google request could not finish. Review again before retrying.",
    },
    error instanceof AuthError ? error.status : 502,
  );
}
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ action: string }> },
) {
  const { action } = await context.params;
  if (action === "callback") {
    const settings = config();
    const response = NextResponse.redirect(`${settings.origin}/sync`, {
      headers,
    });
    const transactionId = request.cookies.get(transactionCookie)?.value || "";
    response.cookies.set(transactionCookie, "", cookieOptions(0));
    try {
      const transaction = await store().read<Transaction>(transactionId);
      if (
        !transaction ||
        transaction.kind !== "login" ||
        transaction.origin !== settings.origin ||
        !equal(
          transaction.state,
          request.nextUrl.searchParams.get("state") || "",
        )
      )
        throw new AuthError("Invalid login state");
      await store().remove(transactionId);
      const code = request.nextUrl.searchParams.get("code");
      if (!code || request.nextUrl.searchParams.has("error"))
        throw new AuthError("Authorization cancelled");
      const result = await tokens({
        grant_type: "authorization_code",
        code,
        code_verifier: transaction.verifier,
        redirect_uri: settings.redirectUri,
      });
      if (!result.refresh_token || !result.scope?.split(" ").includes(scope))
        throw new AuthError("Offline Sheets permission was not granted");
      const id = newId();
      await store().write(id, {
        kind: "session",
        expires: Date.now() + sessionDuration,
        origin: settings.origin,
        accessToken: result.access_token!,
        refreshToken: result.refresh_token,
        accessExpires: Date.now() + (result.expires_in || 3600) * 1000,
      } satisfies Session);
      const old = request.cookies.get(cookieName)?.value;
      if (old && /^[a-f0-9]{64}$/.test(old)) await store().remove(old);
      response.cookies.set(
        cookieName,
        id,
        cookieOptions(sessionDuration / 1000),
      );
    } catch {
      response.headers.set(
        "Location",
        `${settings.origin}/sync?connection=failed`,
      );
    }
    return response;
  }
  if (action !== "status") return json({ error: "Not found" }, 404);
  try {
    const settings = config();
    const session = settings.missing.length
      ? null
      : await store().read<Session>(
          request.cookies.get(cookieName)?.value || "",
        );
    return json({
      configured: !settings.missing.length,
      missing: settings.missing,
      origin: settings.origin,
      redirectUri: settings.redirectUri,
      connected:
        session?.kind === "session" && session.origin === settings.origin,
      expires: session?.kind === "session" ? session.expires : null,
    });
  } catch (error) {
    return failure(error);
  }
}

async function handlePost(
  request: NextRequest,
  context: { params: Promise<{ action: string }> },
) {
  try {
    requireOrigin(request);
    const { action } = await context.params;
    if (action === "connect") {
      const settings = config();
      const id = newId();
      const transaction: Transaction = {
        kind: "login",
        expires: Date.now() + 600000,
        state: newId(),
        verifier: randomBytes(32).toString("base64url"),
        origin: settings.origin,
      };
      await store().write(id, transaction);
      const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      url.search = new URLSearchParams({
        client_id: settings.clientId,
        redirect_uri: settings.redirectUri,
        response_type: "code",
        scope,
        access_type: "offline",
        prompt: "consent",
        state: transaction.state,
        code_challenge_method: "S256",
        code_challenge: createHash("sha256")
          .update(transaction.verifier)
          .digest("base64url"),
      }).toString();
      const response = json({ url: url.toString() });
      response.cookies.set(transactionCookie, id, cookieOptions(600));
      return response;
    }
    const { id, session } = await sessionFor(request);
    if (action === "disconnect") {
      // Delete the local session even when Google is unreachable.
      await store().remove(id);
      let revoked = false;
      try {
        revoked = (
          await fetch("https://oauth2.googleapis.com/revoke", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ token: session.refreshToken }),
            signal: AbortSignal.timeout(10000),
          })
        ).ok;
      } catch {}
      const response = json({
        message: revoked
          ? "Disconnected and Google access revoked. Local progress is kept."
          : "Disconnected locally. Google revocation could not be confirmed; remove the app in your Google account permissions if needed.",
      });
      response.cookies.set(cookieName, "", cookieOptions(0));
      return response;
    }
    if (!["review", "sync"].includes(action))
      return json({ error: "Not found" }, 404);
    const text = await request.text();
    if (text.length > 512000)
      throw new AuthError("Progress payload is too large.", 413);
    const body = JSON.parse(text);
    const local = body.local as Record<string, Progress>;
    if (
      !local ||
      typeof local !== "object" ||
      Array.isArray(local) ||
      Object.keys(local).length > 236 ||
      Object.values(local).some((value) => !validateProgress(value))
    )
      throw new AuthError("Invalid task progress.");
    const token = await access(id, session);
    const changes = planSheetChanges(await readMasterPlan(token), local);
    if (action === "review") {
      session.pending = {
        changes,
        localHash: digest(JSON.stringify(local)),
        expires: Date.now() + 600000,
      };
      await store().write(id, session);
      return json({ changes });
    }
    const pending = session.pending;
    if (
      !pending ||
      pending.expires < Date.now() ||
      pending.localHash !== digest(JSON.stringify(local)) ||
      JSON.stringify(pending.changes) !== JSON.stringify(changes)
    )
      throw new AuthError(
        "Local or spreadsheet values changed, or the review expired. Review again.",
        409,
      );
    if (
      changes.some((change) => change.conflict) &&
      body.acceptConflicts !== true
    )
      throw new AuthError(
        "Review and acknowledge the conflicting values first.",
        409,
      );
    delete session.pending;
    await store().write(id, session);
    if (!changes.length) return json({ message: "No pending changes." });
    await sheetsRequest(token, "values:batchUpdate", {
      valueInputOption: "RAW",
      data: changes.map((change) => ({
        range: change.range,
        values: [[change.after]],
      })),
    });
    if (planSheetChanges(await readMasterPlan(token), local).length)
      throw new AuthError(
        "The write was sent but verification found differences. Review again before retrying.",
        409,
      );
    return json({
      message: `Verified ${changes.length} updated cells in Master Plan. Local progress remains saved.`,
    });
  } catch (error) {
    return failure(error);
  }
}

// Serialize session refresh, review, sync and disconnect within this single-server app.
const sessionQueues = new Map<string, Promise<void>>();
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ action: string }> },
) {
  const id = request.cookies.get(cookieName)?.value || "anonymous";
  const previous = sessionQueues.get(id) || Promise.resolve();
  let release!: () => void;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });
  sessionQueues.set(id, current);
  await previous;
  try {
    return await handlePost(request, context);
  } finally {
    release();
    if (sessionQueues.get(id) === current) sessionQueues.delete(id);
  }
}
