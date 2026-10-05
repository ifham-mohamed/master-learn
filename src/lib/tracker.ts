import raw from "../data/tracker.json";
import { PLAN_START, planDate } from "./study";

type RawTask = (typeof raw.tasks)[number];
export type Task = { [K in keyof RawTask]: RawTask[K] };
export type Practice = (typeof raw.practice)[number];
export const tasks: Task[] = raw.tasks.map((task) => ({
  ...task,
  dueDate: planDate(task.endWeek * 7 - 1),
}));
export const tracker = {
  ...raw,
  settings: { ...raw.settings, startDate: PLAN_START },
  tasks,
  weeks: raw.weeks.map((week) => ({
    ...week,
    starts: planDate((week.week - 1) * 7),
  })),
};
export const categories = [...new Set(tasks.map((t) => t.category))];
export const sources = raw.guide.filter((r) => r.type === "Source");
export const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/g, "");
export function isComplete(task: Task) {
  return (
    task.status === "Done" &&
    !!task.evidence.trim() &&
    !!task.completedOn &&
    (task.workType !== "Mock" ||
      (task.technical !== "" &&
        task.communication !== "" &&
        !!task.mockResult &&
        task.mockResult !== "Not Attempted"))
  );
}
export const coreTasks = tasks.filter((t) => t.scope === "Core");
export const completion = Math.round(
  (coreTasks.filter(isComplete).length / coreTasks.length) * 100,
);
export function formatDate(value: string) {
  if (!value) return "Not recorded";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
export function safeUrl(value: string) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export const trackDescriptions: Record<string, string> = {
  "Java & Spring": "From language fundamentals to dependable backend services.",
  "TypeScript & UI":
    "Build a strong foundation for thoughtful, typed interfaces.",
  "CS & SQL": "Understand the systems and data beneath your applications.",
  Engineering: "Test, debug, ship, and explain the decisions you make.",
  "AI Engineering":
    "Work with AI deliberately. Verify and explain independently.",
  DSA: "Develop problem-solving patterns through consistent practice.",
  "System design":
    "Reason about architecture, scale, and the trade-offs between.",
  Projects: "Turn your knowledge into one capstone with reusable evidence.",
  "Mock interviews":
    "Rehearse technical work and clear communication under time.",
  Review: "Reflect on the work, revisit gaps, and adjust the next step.",
  Career: "Connect your skills and evidence to the roles you want.",
};
