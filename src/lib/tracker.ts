import raw from "../data/tracker.json";

type RawTask = (typeof raw.tasks)[number];
export type Task = { [K in keyof RawTask]: RawTask[K] };
export type Practice = (typeof raw.practice)[number];
export const tasks: Task[] = raw.tasks;
export const tracker = raw;
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
  "Java & Spring": "Build the shipment CLI, then enforce stock rules through Spring APIs and PostgreSQL transactions.",
  "TypeScript & UI":
    "Build the React warehouse workflow with typed contracts, accessible screens, and secure session handling.",
  "CS & SQL": "Query warehouse data and verify indexes, transactions, locking, networking, and sessions.",
  Engineering: "Test, debug, review, release and recover the warehouse application.",
  "AI Engineering":
    "Practice independent verification, source checking, and safe handling of inputs and secrets.",
  DSA: "Practice coding patterns and measure the structures that fit warehouse workloads.",
  "System design":
    "Design warehouse boundaries, messaging, search, caching, and failure recovery.",
  Projects: "Follow 24 warehouse checkpoints from terminal input to an independently repeatable demo.",
  "Mock interviews":
    "Practice timed coding and explain your warehouse decisions with real evidence.",
  Review: "Rerun checks, revisit gaps, and adjust the next checkpoint to your capacity.",
  Career: "Turn verified warehouse work into accurate portfolio and interview evidence.",
};
