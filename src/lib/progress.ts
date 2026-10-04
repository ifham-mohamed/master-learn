import type { Task } from "./tracker";
export type Progress = Pick<
  Task,
  | "status"
  | "evidence"
  | "nextAction"
  | "actual"
  | "confidence"
  | "completedOn"
  | "technical"
  | "communication"
  | "mockResult"
>;
export const statuses = ["Not started", "In progress", "Blocked", "Done"];
export function validateProgress(value: unknown): value is Progress {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  const score = (v: unknown) =>
    v === "" ||
    (typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 5);
  return (
    typeof p.status === "string" &&
    statuses.includes(p.status) &&
    ["evidence", "nextAction", "completedOn", "mockResult"].every(
      (k) => typeof p[k] === "string",
    ) &&
    typeof p.actual === "number" &&
    Number.isFinite(p.actual) &&
    p.actual >= 0 &&
    score(p.confidence) &&
    score(p.technical) &&
    score(p.communication) &&
    (p.completedOn === "" ||
      (typeof p.completedOn === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(p.completedOn) &&
        !Number.isNaN(Date.parse(p.completedOn)) &&
        new Date(p.completedOn).toISOString().slice(0, 10) === p.completedOn))
  );
}
