export const PLAN_START = "2026-10-05";
export const STUDY_TIME_ZONE = "Asia/Colombo";
export function planDate(dayOffset: number) {
  return new Date(Date.parse(`${PLAN_START}T00:00:00Z`) + dayOffset * 86400000)
    .toISOString()
    .slice(0, 10);
}
export function studyDate(now: number) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: STUDY_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export type ActiveTimer = { taskId: string; startedAt: number | null };
export type StudySession = {
  id: string;
  taskId: string;
  startedAt: number;
  endedAt: number;
  durationMs: number;
};
export type TimeCorrection = {
  id: string;
  taskId: string;
  at: number;
  before: number;
  after: number;
  note: string;
};
export type StudyState = {
  active: ActiveTimer | null;
  sessions: StudySession[];
  corrections: TimeCorrection[];
};
export const emptyStudy = (): StudyState => ({
  active: null,
  sessions: [],
  corrections: [],
});
export function elapsedMs(active: ActiveTimer | null, now: number) {
  return active?.startedAt == null ? 0 : Math.max(0, now - active.startedAt);
}
export function finishSegment(study: StudyState, now: number, id: string) {
  const durationMs = elapsedMs(study.active, now);
  if (!study.active || study.active.startedAt === null)
    return { study, hours: 0 };
  if (now < study.active.startedAt)
    throw new Error(
      "Your device clock moved backwards. Correct the clock before saving this timer.",
    );
  const session: StudySession = {
    id,
    taskId: study.active.taskId,
    startedAt: study.active.startedAt,
    endedAt: now,
    durationMs,
  };
  return {
    study: {
      ...study,
      active: { taskId: study.active.taskId, startedAt: null },
      sessions: durationMs ? [...study.sessions, session] : study.sessions,
    },
    hours: durationMs / 3600000,
  };
}
export function todayStudyMs(study: StudyState, now: number) {
  const start = Date.parse(`${studyDate(now)}T00:00:00+05:30`);
  const end = start + 86400000;
  const overlap = (a: number, b: number) =>
    Math.max(0, Math.min(b, end, now) - Math.max(a, start));
  return (
    study.sessions.reduce(
      (sum, s) => sum + overlap(s.startedAt, s.endedAt),
      0,
    ) +
    (study.active?.startedAt == null ? 0 : overlap(study.active.startedAt, now))
  );
}
export function clockText(ms: number) {
  const seconds = Math.floor(Math.max(0, ms) / 1000);
  return `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor(seconds / 60) % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}
export function validateStudy(
  value: unknown,
  ids: Set<string>,
): value is StudyState {
  if (!value || typeof value !== "object") return false;
  const s = value as StudyState;
  const number = (n: unknown): n is number =>
    typeof n === "number" && Number.isFinite(n) && n >= 0;
  return (
    (s.active === null ||
      (!!s.active &&
        ids.has(s.active.taskId) &&
        (s.active.startedAt === null || number(s.active.startedAt)))) &&
    Array.isArray(s.sessions) &&
    s.sessions.every(
      (v) =>
        v &&
        typeof v.id === "string" &&
        ids.has(v.taskId) &&
        number(v.startedAt) &&
        number(v.endedAt) &&
        v.endedAt >= v.startedAt &&
        v.durationMs === v.endedAt - v.startedAt,
    ) &&
    new Set(s.sessions.map((v) => v.id)).size === s.sessions.length &&
    Array.isArray(s.corrections) &&
    s.corrections.every(
      (v) =>
        v &&
        typeof v.id === "string" &&
        ids.has(v.taskId) &&
        number(v.at) &&
        number(v.before) &&
        number(v.after) &&
        typeof v.note === "string" &&
        !!v.note.trim(),
    )
  );
}
