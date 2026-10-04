import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { proxy } from "../src/proxy";

test("hosted personal app blocks anonymous access, protects assets, and leaves only health public", () => {
  const names = ["APP_ORIGIN", "APP_ACCESS_PASSWORD", "RENDER"] as const;
  const saved = Object.fromEntries(
    names.map((name) => [name, process.env[name]]),
  );
  try {
    process.env.APP_ORIGIN = "https://learning.example";
    delete process.env.APP_ACCESS_PASSWORD;
    const request = (path = "/sync", auth?: string) =>
      new NextRequest(`https://learning.example${path}`, {
        headers: auth
          ? { authorization: `Basic ${Buffer.from(auth).toString("base64")}` }
          : {},
      });
    assert.equal(proxy(request()).status, 503);
    process.env.APP_ACCESS_PASSWORD = "a-long-test-password-only";
    assert.equal(proxy(request()).status, 401);
    assert.equal(proxy(request("/_next/static/example.js")).status, 401);
    assert.equal(
      proxy(request("/api/google/status", "learner:wrong")).status,
      401,
    );
    assert.equal(
      proxy(request("/sync", "learner:a-long-test-password-only")).headers.get(
        "x-middleware-next",
      ),
      "1",
    );
    assert.equal(
      proxy(request("/api/health")).headers.get("x-middleware-next"),
      "1",
    );
    process.env.APP_ORIGIN = "http://localhost:3100";
    delete process.env.APP_ACCESS_PASSWORD;
    delete process.env.RENDER;
    assert.equal(proxy(request()).headers.get("x-middleware-next"), "1");
    process.env.RENDER = "true";
    assert.equal(proxy(request()).status, 503);
  } finally {
    for (const name of names) {
      if (saved[name] === undefined) delete process.env[name];
      else process.env[name] = saved[name];
    }
  }
});
