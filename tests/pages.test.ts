import test from "node:test";
import assert from "node:assert/strict";
import { staticFilePath } from "../src/lib/deployment";

test("published learning paths are stable, distinct, and cannot execute HTML", () => {
  const html = staticFilePath("CS12", "code/site.html", true);
  assert.ok(html.endsWith(".txt"));
  assert.ok(staticFilePath("CS12", "notes/intro.md").endsWith(".json"));
  assert.ok(staticFilePath("CS12", "results/chart.PNG", true).endsWith(".png"));
  assert.notEqual(
    staticFilePath("CS12", "notes/a b.md"),
    staticFilePath("CS12", "notes/a%20b.md"),
  );
  assert.match(
    staticFilePath("CS12", "notes/説明.md"),
    /^\/learning-data\/CS12\/documents\/[a-f0-9]+\.json$/,
  );
});
