import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { GET, POST } from "../src/app/api/google/[action]/route";
import { SessionStore, seal, unseal } from "../src/lib/google-session-store";
import {
  access,
  cookieName,
  newId,
  store,
  scope,
  transactionCookie,
  type Transaction,
  type Session,
} from "../src/lib/google-session";

test("encrypted session data rejects tampering and wrong keys", () => {
  const key = randomBytes(32);
  const encoded = seal({ refreshToken: "private-value" }, key);
  assert.ok(!encoded.includes("private-value"));
  assert.deepEqual(unseal(encoded, key), { refreshToken: "private-value" });
  assert.throws(() => unseal(encoded, randomBytes(32)));
  const bytes = Buffer.from(encoded, "base64url");
  bytes[30] ^= 1;
  assert.throws(() => unseal(bytes.toString("base64url"), key));
});

test("server session survives store reload, renews tokens, protects requests and disconnects", async () => {
  const base = path.resolve("artifacts");
  await mkdir(base, { recursive: true });
  const root = await mkdtemp(path.join(base, "session-test-"));
  const names = [
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_SESSION_KEY",
    "GOOGLE_SESSION_DIR",
    "APP_ORIGIN",
  ] as const;
  const saved = Object.fromEntries(
    names.map((name) => [name, process.env[name]]),
  );
  const originalFetch = global.fetch;
  process.env.GOOGLE_CLIENT_ID = "test-client";
  process.env.GOOGLE_CLIENT_SECRET = "test-secret";
  process.env.GOOGLE_SESSION_KEY = randomBytes(32).toString("hex");
  process.env.GOOGLE_SESSION_DIR = root;
  process.env.APP_ORIGIN = "http://localhost:3100";
  const id = newId();
  const session: Session = {
    kind: "session",
    expires: Date.now() + 600000,
    origin: process.env.APP_ORIGIN,
    accessToken: "expired-access",
    refreshToken: "test-refresh",
    accessExpires: 0,
  };
  const request = (
    action: string,
    method = "GET",
    origin = "http://localhost:3100",
  ) =>
    new NextRequest(`http://localhost:3100/api/google/${action}`, {
      method,
      headers: { cookie: `${cookieName}=${id}`, origin },
    });
  const context = (action: string) => ({ params: Promise.resolve({ action }) });
  try {
    await store().write(id, session);
    const reopened = new SessionStore(
      root,
      Buffer.from(process.env.GOOGLE_SESSION_KEY!, "hex"),
    );
    assert.equal(
      (await reopened.read<Session>(id))?.refreshToken,
      "test-refresh",
    );
    assert.ok(
      !(await readFile(path.join(root, `${id}.session`), "utf8")).includes(
        "test-refresh",
      ),
    );
    const status = await GET(request("status"), context("status"));
    const data = await status.json();
    assert.equal(data.connected, true);
    assert.ok(!JSON.stringify(data).includes("test-refresh"));
    assert.equal(status.headers.get("cache-control"), "no-store");
    const denied = await POST(
      request("disconnect", "POST", "https://attacker.example"),
      context("disconnect"),
    );
    assert.equal(denied.status, 403);
    assert.ok(await reopened.read(id));
    global.fetch = async (input, options) => {
      assert.equal(String(input), "https://oauth2.googleapis.com/token");
      assert.match(String(options?.body), /grant_type=refresh_token/);
      return Response.json({
        access_token: "renewed-access",
        expires_in: 3600,
      });
    };
    assert.equal(await access(id, session), "renewed-access");
    assert.equal(
      (await reopened.read<Session>(id))?.accessToken,
      "renewed-access",
    );
    global.fetch = async () => new Response("", { status: 200 });
    const disconnected = await POST(
      request("disconnect", "POST"),
      context("disconnect"),
    );
    assert.equal(disconnected.status, 200);
    assert.equal(await reopened.read(id), null);
    assert.match(disconnected.headers.get("set-cookie") || "", /HttpOnly/i);
    assert.match(disconnected.headers.get("set-cookie") || "", /Max-Age=0/i);
    await reopened.write(id, { ...session, expires: Date.now() - 1 });
    assert.equal(await reopened.read(id), null);
    assert.equal(await reopened.read("../outside"), null);
    const callback = await GET(
      new NextRequest(
        "http://localhost:3100/api/google/callback?state=forged&code=bogus",
      ),
      context("callback"),
    );
    assert.match(callback.headers.get("location") || "", /connection=failed/);
    const connect = await POST(request("connect", "POST"), context("connect"));
    const authorization = new URL((await connect.json()).url);
    const transactionId = connect.cookies.get(transactionCookie)!.value;
    const transaction = (await store().read<Transaction>(transactionId))!;
    assert.equal(authorization.searchParams.get("access_type"), "offline");
    assert.equal(
      authorization.searchParams.get("code_challenge_method"),
      "S256",
    );
    assert.equal(authorization.searchParams.get("state"), transaction.state);
    let exchanges = 0;
    global.fetch = async (input, options) => {
      exchanges++;
      assert.equal(String(input), "https://oauth2.googleapis.com/token");
      const body = new URLSearchParams(String(options?.body));
      assert.equal(body.get("code_verifier"), transaction.verifier);
      assert.equal(
        body.get("redirect_uri"),
        "http://localhost:3100/api/google/callback",
      );
      return Response.json({
        access_token: "new-access",
        refresh_token: "new-refresh",
        expires_in: 3600,
        scope,
      });
    };
    const callbackRequest = () =>
      new NextRequest(
        `http://localhost:3100/api/google/callback?state=${transaction.state}&code=test-code`,
        {
          headers: { cookie: `${transactionCookie}=${transactionId}` },
        },
      );
    const accepted = await GET(callbackRequest(), context("callback"));
    assert.equal(
      accepted.headers.get("location"),
      "http://localhost:3100/sync",
    );
    const connectedId = accepted.cookies.get(cookieName)!.value;
    assert.match(connectedId, /^[a-f0-9]{64}$/);
    assert.match(accepted.headers.get("set-cookie") || "", /HttpOnly/);
    assert.equal(
      (await store().read<Session>(connectedId))?.refreshToken,
      "new-refresh",
    );
    const afterReload = await GET(
      new NextRequest("http://localhost:3100/api/google/status", {
        headers: { cookie: `${cookieName}=${connectedId}` },
      }),
      context("status"),
    );
    assert.equal((await afterReload.json()).connected, true);
    const replay = await GET(callbackRequest(), context("callback"));
    assert.match(replay.headers.get("location") || "", /connection=failed/);
    assert.equal(exchanges, 1);
  } finally {
    global.fetch = originalFetch;
    for (const name of names) {
      if (saved[name] === undefined) delete process.env[name];
      else process.env[name] = saved[name];
    }
    assert.ok(root.startsWith(base + path.sep));
    await rm(root, { recursive: true, force: true });
  }
});
