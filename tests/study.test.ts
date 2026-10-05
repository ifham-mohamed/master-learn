import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyStudy,
  finishSegment,
  elapsedMs,
  planDate,
  studyDate,
  todayStudyMs,
  validateStudy,
} from "../src/lib/study";
import { tasks, tracker } from "../src/lib/tracker";

test("schedule starts 5 October and preserves week durations across year boundaries", () => {
  assert.equal(tracker.settings.startDate, "2026-10-05");
  assert.equal(tracker.weeks[0].starts, "2026-10-05");
  assert.equal(planDate(6), "2026-10-11");
  assert.equal(planDate(167), "2027-03-21");
  for (const task of tasks)
    assert.equal(task.dueDate, planDate(task.endWeek * 7 - 1));
  assert.equal(tasks[0].completedOn, "2026-09-29");
});
test("pause and resume record only running segments, and stopping a paused timer cannot double count", () => {
  const start = Date.parse("2026-10-05T09:00:00+05:30");
  const running = {
    ...emptyStudy(),
    active: { taskId: "CS12", startedAt: start },
  };
  const restored = JSON.parse(JSON.stringify(running));
  assert.equal(elapsedMs(restored.active, start + 900000), 900000);
  const paused = finishSegment(restored, start + 900000, "first");
  assert.equal(paused.hours, 0.25);
  assert.equal(
    finishSegment(paused.study, start + 1200000, "duplicate").hours,
    0,
  );
  paused.study.active = { taskId: "CS12", startedAt: start + 1800000 };
  const second = finishSegment(paused.study, start + 3600000, "second");
  assert.equal(second.hours, 0.5);
  assert.equal(
    second.study.sessions.reduce((sum, s) => sum + s.durationMs, 0),
    2700000,
  );
  assert.throws(() => finishSegment(running, start - 1, "bad-clock"));
});
test("today uses Sri Lanka calendar boundaries and splits sessions over midnight", () => {
  const midnight = Date.parse("2026-10-06T00:00:00+05:30");
  assert.equal(studyDate(midnight), "2026-10-06");
  const study = finishSegment(
    {
      ...emptyStudy(),
      active: { taskId: "CS12", startedAt: midnight - 1800000 },
    },
    midnight + 1800000,
    "night",
  ).study;
  assert.equal(todayStudyMs(study, midnight + 3600000), 1800000);
  study.active = { taskId: "CS12", startedAt: midnight + 1800000 };
  assert.equal(todayStudyMs(study, midnight + 3600000), 3600000);
});
test("timer storage rejects unknown tasks, duplicate session IDs, and inconsistent durations", () => {
  const ids = new Set(["CS12"]);
  const valid = finishSegment(
    { ...emptyStudy(), active: { taskId: "CS12", startedAt: 1000 } },
    2000,
    "one",
  ).study;
  assert.equal(validateStudy(valid, ids), true);
  assert.equal(
    validateStudy(
      { ...valid, active: { taskId: "unknown", startedAt: 1 } },
      ids,
    ),
    false,
  );
  assert.equal(
    validateStudy(
      { ...valid, sessions: [...valid.sessions, valid.sessions[0]] },
      ids,
    ),
    false,
  );
  assert.equal(
    validateStudy(
      { ...valid, sessions: [{ ...valid.sessions[0], durationMs: -1 }] },
      ids,
    ),
    false,
  );
});
