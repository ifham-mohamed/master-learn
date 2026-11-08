import test from "node:test";
import assert from "node:assert/strict";
import { tasks } from "../src/lib/tracker";
import { defaultSchedule } from "../src/lib/planner";
import {
  nextWarehouseTask,
  warehouseBrief,
  warehouseHoursPerDay,
  warehousePhases,
} from "../src/lib/warehouse";

test("warehouse practice covers every existing task and phase", () => {
  for (const task of tasks) {
    const brief = warehouseBrief(task.id);
    assert.ok(brief?.focus && brief.build && brief.verify, task.id);
    assert.equal(brief.week, task.startWeek);
    assert.equal(brief.scope, task.scope);
    assert.equal(
      warehousePhases.filter(
        (phase) => brief.week >= phase.start && brief.week <= phase.end,
      ).length,
      1,
    );
  }
  assert.equal(warehouseBrief("unknown"), undefined);
  assert.equal(
    defaultSchedule.capacity / defaultSchedule.days.length,
    warehouseHoursPerDay,
  );
});

test("warehouse next step follows evidence and preserves the introductory order", () => {
  const complete = (...ids: string[]) =>
    tasks.map((task) =>
      ids.includes(task.id)
        ? {
            ...task,
            status: "Done",
            completedOn: "2026-11-08",
            evidence: "Independent test run",
          }
        : task,
    );
  assert.equal(nextWarehouseTask(tasks)?.id, "JA05");
  assert.equal(nextWarehouseTask(complete("JA05"))?.id, "JA06");
  assert.equal(nextWarehouseTask(complete("JA05", "JA06"))?.id, "B01");
  assert.equal(nextWarehouseTask(complete("JA05", "JA06", "B01"))?.id, "B02");
});
