import path from "../data/warehouse-path.json";
import { isComplete, type Task } from "./tracker";

type Brief = {
  title: string;
  week: number;
  category: string;
  scope: string;
  checkpoint: string;
  focus: string;
  build: string;
  verify: string;
  requires: readonly string[];
  labs: readonly string[];
};
const briefs: Readonly<Record<string, Brief | undefined>> = path.tasks;

export const warehousePhases = path.phases;
export const warehouseCheckpoints = path.checkpoints;
export const warehouseLabs = path.labs;
export const warehouseRequirements = path.requirements;
export const warehouseHoursPerDay = path.hoursPerDay;
export const warehouseBrief = (id: string) => briefs[id];
export const warehouseTitle = (task: Task) =>
  warehouseBrief(task.id)?.title || task.title;
export const warehousePhase = (week: number) =>
  warehousePhases.find((phase) => week >= phase.start && week <= phase.end);
export const checkpointHref = (id: string) => `/projects#checkpoint-${id}`;
export const warehouseSearch = (task: Task, query: string) => {
  const brief = warehouseBrief(task.id);
  const labels = warehouseLabs
    .filter((lab) => brief?.labs.includes(lab.id))
    .flatMap((lab) => [lab.id, lab.title, lab.build]);
  return [
    task.id,
    task.title,
    task.category,
    task.section,
    task.doneWhen,
    task.prompt,
    brief?.title,
    brief?.focus,
    brief?.build,
    brief?.verify,
    ...labels,
  ]
    .join(" ")
    .toLowerCase()
    .replaceAll("-", " ")
    .includes(query.trim().toLowerCase().replaceAll("-", " "));
};

export function nextWarehouseTask(tasks: Task[]) {
  for (const id of path.order) {
    const task = tasks.find((item) => item.id === id);
    if (task && !isComplete(task)) return task;
  }
}
