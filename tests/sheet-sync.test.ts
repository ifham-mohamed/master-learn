import test from "node:test";
import assert from "node:assert/strict";
import {
  planSheetChanges,
  sheetDate,
  sheetFields,
} from "../src/lib/sheet-sync";
import { tasks } from "../src/lib/tracker";
import type { Progress } from "../src/lib/progress";

const task = tasks.find((task) => task.id === "CS12")!;
function fixture() {
  const header: (string | number)[] = Array(31).fill("");
  header[0] = "Task ID";
  const row: (string | number)[] = Array(31).fill("");
  row[0] = task.id;
  const progress = Object.fromEntries(
    sheetFields.map(([key, label, , index]) => {
      header[index] = label;
      row[index] = key === "completedOn" ? sheetDate(task[key]) : task[key];
      return [key, task[key]];
    }),
  ) as Progress;
  row[9] = "=TODAY()";
  row[18] = "=R2+7";
  row[29] = '=IF(G2="Done",1,0)';
  return { rows: [header, row], progress };
}
test("sync touches only changed progress fields and resolves task rows by ID", () => {
  const { rows, progress } = fixture();
  rows.splice(1, 0, ["ANOTHER"]);
  const changes = planSheetChanges(rows, {
    CS12: { ...progress, status: "In progress", evidence: "=literal text" },
  });
  assert.deepEqual(
    changes.map((c) => c.range),
    ["'Master Plan'!G3", "'Master Plan'!H3"],
  );
  assert.equal(changes[1].after, "=literal text");
  assert.equal(changes[0].conflict, false);
});
test("sync rejects changed headers, duplicate IDs, and formula cells", () => {
  const { rows, progress } = fixture();
  const local = { CS12: { ...progress, status: "In progress" } };
  rows[0][6] = "Renamed";
  assert.throws(() => planSheetChanges(rows, local), /columns changed/);
  rows[0][6] = "Status";
  rows.push([...rows[1]]);
  assert.throws(() => planSheetChanges(rows, local), /exactly once/);
  rows.pop();
  rows[1][6] = "=A1";
  assert.throws(() => planSheetChanges(rows, local), /formula/);
});
test("sync flags remote conflicts, skips already-synced values, and retains unrelated sheet edits", () => {
  const { rows, progress } = fixture();
  rows[1][6] = "Blocked";
  rows[1][7] = "Remote evidence";
  const local = { CS12: { ...progress, status: "In progress" } };
  const changes = planSheetChanges(rows, local);
  assert.equal(changes.length, 1);
  assert.equal(changes[0].conflict, true);
  rows[1][6] = "In progress";
  assert.deepEqual(planSheetChanges(rows, local), []);
});
test("completion dates are numeric spreadsheet dates; unknown tasks rejected", () => {
  assert.equal(sheetDate("1970-01-01"), 25569);
  assert.equal(sheetDate(""), "");
  const { rows, progress } = fixture();
  assert.throws(
    () => planSheetChanges(rows, { UNKNOWN: progress }),
    /Invalid local progress/,
  );
  const changes = planSheetChanges(rows, {
    CS12: { ...progress, completedOn: "2026-10-05" },
  });
  assert.equal(typeof changes[0].after, "number");
  assert.equal(changes[0].range, "'Master Plan'!R2");
});
