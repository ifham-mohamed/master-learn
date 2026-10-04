import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  tasks,
  tracker,
  sources,
  categories,
  isComplete,
  safeUrl,
  slug,
  type Task,
} from "../src/lib/tracker";
import { validateProgress } from "../src/lib/progress";
import audit from "../docs/source-audit.json";

test("all original records are preserved and task IDs are unique", () => {
  assert.equal(tasks.length, 236);
  assert.equal(new Set(tasks.map((t) => t.id)).size, 236);
  assert.equal(tracker.practice.length, 74);
  assert.equal(sources.length, 34);
  assert.equal(tracker.weeks.length, 24);
  assert.equal(categories.length, 11);
  assert.equal(new Set(categories.map(slug)).size, 11);
  assert.equal(tasks.filter((t) => t.workType === "Mock").length, 44);
});
test("all archived files retain their audited content", () => {
  assert.equal(audit.inventory.length, 21);
  for (const file of audit.inventory)
    assert.equal(
      createHash("sha256").update(readFileSync(file.path)).digest("hex"),
      file.sha256,
      file.path,
    );
  const categoryViews = audit.inventory.filter(
    (f) => "matchesMasterTaskIds" in f,
  );
  assert.equal(categoryViews.length, 11);
  assert.ok(categoryViews.every((f) => f.matchesMasterTaskIds));
});
test("resource references resolve and DSA targets reconcile", () => {
  for (const task of tasks)
    for (const ref of task.sourceIds.split(/\s+/).filter(Boolean))
      assert.ok(
        sources.some((s) => s.relatedIds === ref),
        `${task.id}: ${ref}`,
      );
  assert.equal(
    tracker.practice.reduce((sum, p) => sum + Number(p.target || 0), 0),
    145,
  );
  assert.equal(
    tracker.weeks.reduce((sum, w) => sum + w.dsaTarget, 0),
    145,
  );
  assert.equal(tasks.filter((t) => t.scope === "Core").length, 226);
  assert.equal(tasks.filter(isComplete).length, 2);
});
test("completion requires evidence and a date, never confidence or hours alone", () => {
  const task: Task = {
    ...tasks[0],
    status: "Done",
    evidence: "",
    confidence: 5,
    actual: 100,
  };
  assert.equal(isComplete(task), false);
  assert.equal(
    isComplete({ ...task, evidence: "Test output", completedOn: "" }),
    false,
  );
  assert.equal(
    isComplete({ ...task, evidence: "Test output", completedOn: "2026-10-04" }),
    true,
  );
});
test("a failed mock can be complete; missing scores or an unattempted result cannot", () => {
  const task: Task = {
    ...tasks[0],
    workType: "Mock",
    status: "Done",
    evidence: "Mock recording",
    completedOn: "2026-10-04",
    technical: 0,
    communication: 0,
    mockResult: "Fail",
  };
  assert.equal(isComplete(task), true);
  assert.equal(isComplete({ ...task, technical: "" }), false);
  assert.equal(isComplete({ ...task, communication: "" }), false);
  assert.equal(isComplete({ ...task, mockResult: "Not Attempted" }), false);
});
test("local progress rejects corrupted values and resource links reject unsafe schemes", () => {
  const progress = {
    status: "In progress",
    evidence: "",
    nextAction: "",
    actual: 0,
    confidence: 0,
    completedOn: "",
    technical: "",
    communication: "",
    mockResult: "",
  };
  assert.ok(validateProgress(progress));
  assert.equal(validateProgress({ ...progress, actual: -2 }), false);
  assert.equal(validateProgress({ ...progress, confidence: 6 }), false);
  assert.equal(validateProgress({ ...progress, technical: "5" }), false);
  assert.equal(
    validateProgress({ ...progress, completedOn: "invalid" }),
    false,
  );
  assert.equal(validateProgress(null), false);
  assert.equal(safeUrl("javascript:alert(1)"), null);
  assert.equal(safeUrl("https://react.dev/learn"), "https://react.dev/learn");
});
