import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile, rm, symlink } from "node:fs/promises";
import path from "node:path";
import {
  getLearningManifest,
  readLearningDocument,
  resolveLearningFile,
  taskFolder,
  MAX_TEXT_BYTES,
} from "../src/lib/learning-files";
import { resolveLearningLink } from "../src/lib/learning-types";

test("learning files refresh on add, edit, remove; exclude generated and hidden files", async () => {
  const base = path.resolve("artifacts");
  await mkdir(base, { recursive: true });
  const root = await mkdtemp(path.join(base, "learning-test-"));
  const folder = path.join(root, taskFolder("CS12"));
  try {
    await mkdir(path.join(folder, "notes"), { recursive: true });
    await mkdir(path.join(folder, "code", "node_modules"), { recursive: true });
    await writeFile(path.join(folder, "notes", "first.md"), "# First");
    await writeFile(path.join(folder, "notes", ".secret.md"), "hidden");
    await writeFile(
      path.join(folder, "code", "node_modules", "ignored.js"),
      "hidden",
    );
    const first = await getLearningManifest("CS12", root);
    assert.deepEqual(
      first.files.map((f) => f.path),
      ["notes/first.md"],
    );
    await writeFile(path.join(folder, "notes", "first.md"), "# Edited content");
    const edited = await getLearningManifest("CS12", root);
    assert.notEqual(first.revision, edited.revision);
    assert.equal(
      (await readLearningDocument("CS12", "notes/first.md", root)).content,
      "# Edited content",
    );
    await writeFile(path.join(folder, "notes", "second.md"), "# Second");
    assert.equal((await getLearningManifest("CS12", root)).files.length, 2);
    await rm(path.join(folder, "notes", "second.md"));
    assert.equal((await getLearningManifest("CS12", root)).files.length, 1);
    for (const invalid of [
      "../README.md",
      "notes/../../README.md",
      "notes\\first.md",
      "notes/.secret.md",
      "notes/C:/first.md",
      "code/node_modules/ignored.js",
    ]) {
      await assert.rejects(resolveLearningFile("CS12", invalid, root));
    }
    await assert.rejects(getLearningManifest("unknown", root));
    await writeFile(
      path.join(folder, "notes", "large.txt"),
      "x".repeat(MAX_TEXT_BYTES + 1),
    );
    await assert.rejects(
      readLearningDocument("CS12", "notes/large.txt", root),
      /1 MB/,
    );
    await symlink(
      path.join(folder, "notes"),
      path.join(folder, "resources"),
      "junction",
    );
    await assert.rejects(
      resolveLearningFile("CS12", "resources/first.md", root),
      /Linked/,
    );
    assert.match(
      (await getLearningManifest("CS12", root)).warnings.join(" "),
      /linked section/,
    );
  } finally {
    assert.ok(root.startsWith(base + path.sep));
    await rm(root, { recursive: true, force: true });
  }
});

test("Markdown links resolve within the task and reject unsafe targets", () => {
  assert.equal(
    resolveLearningLink("theory/concepts.md", "../code/example.jsx"),
    "code/example.jsx",
  );
  assert.equal(
    resolveLearningLink("notes/a.md", "./nested/my%20note.md"),
    "notes/nested/my note.md",
  );
  for (const href of [
    "../../outside.md",
    "javascript:alert(1)",
    "/etc/passwd",
    "\\server\\file",
    "%invalid",
  ]) {
    assert.equal(resolveLearningLink("notes/a.md", href), null);
  }
});
