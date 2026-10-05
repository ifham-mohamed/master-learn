import {
  PLAN_START,
  type StudyState,
  emptyStudy,
  validateStudy,
} from "./study";
import { tasks, type Task, isComplete } from "./tracker";
import { validateProgress, type Progress } from "./progress";

export type Schedule = {
  start: string;
  capacity: number;
  days: number[];
  focus: number;
  breakMinutes: number;
};
export type Journal = {
  id: string;
  taskId: string;
  at: string;
  kind: string;
  text: string;
};
export type Planner = {
  schedule: Schedule;
  journal: Journal[];
  reviews: Record<string, string>;
  synced: Record<string, Progress>;
  syncedAt: string;
};
export const defaultSchedule: Schedule = {
  start: PLAN_START,
  capacity: 10,
  days: [0, 1, 2, 3, 4, 5, 6],
  focus: 25,
  breakMinutes: 5,
};
export const emptyPlanner = (): Planner => ({
  schedule: { ...defaultSchedule, days: [...defaultSchedule.days] },
  journal: [],
  reviews: {},
  synced: {},
  syncedAt: "",
});
export function validDate(s: unknown): s is string {
  return (
    typeof s === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    !Number.isNaN(Date.parse(s)) &&
    new Date(s).toISOString().slice(0, 10) === s
  );
}
export function addDays(date: string, n: number) {
  return new Date(Date.parse(date + "T00:00:00Z") + n * 86400000)
    .toISOString()
    .slice(0, 10);
}
export function validSchedule(s: Schedule) {
  return (
    !!s &&
    validDate(s.start) &&
    s.start >= "2000-01-01" &&
    s.start <= "2100-01-01" &&
    Number.isFinite(s.capacity) &&
    s.capacity > 0 &&
    s.capacity <= 168 &&
    Array.isArray(s.days) &&
    s.days.length > 0 &&
    new Set(s.days).size === s.days.length &&
    s.days.every((d) => Number.isInteger(d) && d >= 0 && d <= 6) &&
    Number.isInteger(s.focus) &&
    s.focus >= 5 &&
    s.focus <= 120 &&
    Number.isInteger(s.breakMinutes) &&
    s.breakMinutes >= 1 &&
    s.breakMinutes <= 60
  );
}
export function taskDates(task: Task, schedule: Schedule) {
  const first = addDays(schedule.start, (task.startWeek - 1) * 7);
  const last = addDays(schedule.start, task.endWeek * 7 - 1);
  let start = first,
    due = last;
  for (let i = 0; i < 7; i++) {
    const d = addDays(first, i);
    if (schedule.days.includes(new Date(d + "T00:00:00Z").getUTCDay())) {
      start = d;
      break;
    }
  }
  for (let i = 0; i < 7; i++) {
    const d = addDays(last, -i);
    if (schedule.days.includes(new Date(d + "T00:00:00Z").getUTCDay())) {
      due = d;
      break;
    }
  }
  return { start, due };
}
export function missingPrerequisites(task: Task, all: Task[]) {
  return [...new Set(task.prerequisites.match(/[A-Z]+\d+/g) || [])].filter(
    (id) => !all.some((t) => t.id === id && isComplete(t)),
  );
}
export function readyTasks(all: Task[]) {
  return all
    .filter(
      (t) =>
        !isComplete(t) &&
        t.status !== "Blocked" &&
        !missingPrerequisites(t, all).length,
    )
    .sort(
      (a, b) =>
        a.dueDate.localeCompare(b.dueDate) ||
        a.priority.localeCompare(b.priority) ||
        a.id.localeCompare(b.id, undefined, { numeric: true }),
    );
}
export const reviewOffsets = [1, 3, 7, 14];
export function reviewQueue(all: Task[], reviewed: Record<string, string>) {
  return all
    .filter(isComplete)
    .flatMap((t) =>
      reviewOffsets.map((days) => ({
        task: t,
        days,
        key: `${t.id}:${t.completedOn}:${days}`,
        due: addDays(t.completedOn, days),
      })),
    )
    .filter((r) => !reviewed[r.key])
    .sort((a, b) => a.due.localeCompare(b.due));
}
const ids = new Set(tasks.map((t) => t.id));
export type Backup = {
  version: 1;
  tasks: Record<string, Progress>;
  study: StudyState;
  planner: Planner;
  preferences?: unknown;
};
export function parsePlanner(value: unknown): Planner {
  if (value === undefined) return emptyPlanner();
  const p = value as Planner;
  if (
    !p ||
    !validSchedule(p.schedule) ||
    !Array.isArray(p.journal) ||
    !p.reviews ||
    !p.synced ||
    typeof p.syncedAt !== "string"
  )
    throw new Error("Invalid planner data.");
  if (
    p.journal.some(
      (j) =>
        !j ||
        typeof j.id !== "string" ||
        !ids.has(j.taskId) ||
        !validDate(j.at) ||
        !["Note", "Question", "Mistake", "Reflection"].includes(j.kind) ||
        typeof j.text !== "string" ||
        j.text.length > 20000,
    ) ||
    new Set(p.journal.map((j) => j.id)).size !== p.journal.length
  )
    throw new Error("Invalid journal entries.");
  if (
    Object.entries(p.reviews).some(
      ([key, date]) =>
        !/^[A-Z]+\d+:\d{4}-\d{2}-\d{2}:(1|3|7|14)$/.test(key) ||
        !validDate(date),
    )
  )
    throw new Error("Invalid revision history.");
  if (
    Object.entries(p.synced).some(
      ([id, v]) => !ids.has(id) || !validateProgress(v),
    )
  )
    throw new Error("Invalid sync history.");
  return p;
}
export function parseBackup(text: string): Backup {
  if (text.length > 10 * 1024 * 1024)
    throw new Error("Backup is larger than 10 MB.");
  const b = JSON.parse(text);
  if (
    !b ||
    b.version !== 1 ||
    !b.tasks ||
    typeof b.tasks !== "object" ||
    Array.isArray(b.tasks)
  )
    throw new Error("Choose a Learnspace version 1 backup.");
  for (const [id, v] of Object.entries(b.tasks))
    if (!ids.has(id) || !validateProgress(v))
      throw new Error(`Invalid task progress: ${id}`);
  const study = b.study || emptyStudy();
  if (!validateStudy(study, ids)) throw new Error("Invalid timer history.");
  return {
    version: 1,
    tasks: b.tasks,
    study,
    planner: parsePlanner(b.planner),
  };
}
// Merge keeps the current copy of existing tasks and their accounting history together.
// It only imports progress/history for tasks without local overrides: totals are never added twice.
export function mergeBackup(current: Backup, incoming: Backup): Backup {
  const added = new Set(
    Object.keys(incoming.tasks).filter(
      (id) => !Object.hasOwn(current.tasks, id),
    ),
  );
  const unique = <T extends { id: string }>(a: T[], b: T[]) => [
    ...a,
    ...b.filter((x) => !a.some((y) => y.id === x.id)),
  ];
  return {
    ...current,
    tasks: { ...incoming.tasks, ...current.tasks },
    study: {
      ...current.study,
      sessions: unique(
        current.study.sessions,
        incoming.study.sessions.filter((s) => added.has(s.taskId)),
      ),
      corrections: unique(
        current.study.corrections,
        incoming.study.corrections.filter((s) => added.has(s.taskId)),
      ),
    },
    planner: {
      ...current.planner,
      journal: unique(current.planner.journal, incoming.planner.journal),
      reviews: { ...incoming.planner.reviews, ...current.planner.reviews },
    },
  };
}
