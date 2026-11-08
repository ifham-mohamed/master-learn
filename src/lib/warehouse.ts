import path from "../data/warehouse-path.json";
import { isComplete, type Task } from "./tracker";

type Brief = (typeof path.tasks)[keyof typeof path.tasks];
const briefs: Readonly<Record<string, Brief | undefined>> = path.tasks;

export const warehousePhases = path.phases;
export const warehouseHoursPerDay = path.hoursPerDay;
export const warehouseBrief = (id: string) => briefs[id];

export function nextWarehouseTask(tasks: Task[]) {
  for (const id of path.order) {
    const task = tasks.find((item) => item.id === id);
    if (task && !isComplete(task)) return task;
  }
}
