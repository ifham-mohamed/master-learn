import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultSchedule,
  taskDates,
  parseBackup,
  mergeBackup,
  emptyPlanner,
  readyTasks,
  reviewQueue,
} from "../src/lib/planner";
import { tasks } from "../src/lib/tracker";
import { emptyStudy } from "../src/lib/study";
const source = tasks.find((t) => t.id === "CS12")!;
const progress = {
  status: "In progress",
  evidence: "",
  nextAction: "",
  actual: 1,
  confidence: 0,
  completedOn: "",
  technical: "",
  communication: "",
  mockResult: "",
};
test("schedule restricts task dates to selected study days without moving task weeks", () => {
  assert.deepEqual(taskDates(source, defaultSchedule), {
    start: "2026-10-05",
    due: "2026-10-11",
  });
  assert.deepEqual(taskDates(source, { ...defaultSchedule, days: [1, 3, 5] }), {
    start: "2026-10-05",
    due: "2026-10-09",
  });
});
test("backup validates legacy data and rejects corrupt progress and planner settings", () => {
  assert.equal(
    parseBackup(JSON.stringify({ version: 1, tasks: { CS12: progress } }))
      .planner.schedule.start,
    "2026-10-05",
  );
  assert.throws(() =>
    parseBackup(
      JSON.stringify({
        version: 1,
        tasks: { CS12: { ...progress, actual: -1 } },
      }),
    ),
  );
  assert.throws(() =>
    parseBackup(
      JSON.stringify({
        version: 1,
        tasks: {},
        planner: {
          ...emptyPlanner(),
          schedule: { ...defaultSchedule, days: [] },
        },
      }),
    ),
  );
});
test("merge never sums overlapping actual hours or double-imports session history", () => {
  const current = {
    version: 1 as const,
    tasks: { CS12: progress },
    study: emptyStudy(),
    planner: emptyPlanner(),
  };
  const incoming = {
    ...current,
    tasks: { CS12: { ...progress, actual: 3 } },
    study: {
      ...emptyStudy(),
      sessions: [
        {
          id: "s1",
          taskId: "CS12",
          startedAt: 0,
          endedAt: 3600000,
          durationMs: 3600000,
        },
      ],
    },
  };
  const once = mergeBackup(current, incoming);
  assert.equal(once.tasks.CS12.actual, 1);
  assert.equal(once.study.sessions.length, 0);
  assert.deepEqual(mergeBackup(once, incoming), once);
  const empty = { ...current, tasks: {} };
  const imported = mergeBackup(empty, incoming);
  assert.equal(imported.tasks.CS12.actual, 3);
  assert.equal(imported.study.sessions.length, 1);
  assert.deepEqual(mergeBackup(imported, incoming), imported);
});
test("ready queue respects prerequisites and revision queue uses completion dates", () => {
  const first = {
    ...source,
    id: "CS11",
    prerequisites: "",
    status: "Done",
    completedOn: "2026-10-05",
    evidence: "Test passed",
  };
  const next = { ...source, prerequisites: "CS11", status: "Not started" };
  assert.equal(readyTasks([first, next])[0].id, "CS12");
  assert.equal(readyTasks([{ ...first, status: "Blocked" }, next]).length, 0);
  const queue = reviewQueue([first], {});
  assert.deepEqual(
    queue.map((r) => r.due),
    ["2026-10-06", "2026-10-08", "2026-10-12", "2026-10-19"],
  );
  assert.equal(
    reviewQueue([first], { [queue[0].key]: "2026-10-06" }).length,
    3,
  );
});
