"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { tasks as originalTasks, isComplete, type Task } from "@/lib/tracker";
import { validateProgress, type Progress } from "@/lib/progress";
import {
  emptyStudy,
  finishSegment,
  validateStudy,
  type StudyState,
} from "@/lib/study";

type Preferences = {
  week: number;
  query: string;
  category: string;
  status: string;
};
const defaults: Preferences = { week: 1, query: "", category: "", status: "" };
type Saved = {
  version: 1;
  tasks: Record<string, Progress>;
  preferences: Preferences;
  study: StudyState;
};
type Context = {
  tasks: Task[];
  editing: boolean;
  setEditing: (value: boolean) => void;
  preferences: Preferences;
  setPreferences: (patch: Partial<Preferences>) => void;
  save: (id: string, value: Progress) => Promise<boolean>;
  error: string;
  loaded: boolean;
  localCount: number;
  localProgress: Record<string, Progress>;
  study: StudyState;
  timerAction: (
    id: string,
    action: "start" | "pause" | "stop",
  ) => Promise<boolean>;
  correctHours: (id: string, hours: number, note: string) => Promise<boolean>;
  exportProgress: () => void;
};
const TrackerContext = createContext<Context | null>(null);
const KEY = "learnspace-progress-v1";
const ids = new Set(originalTasks.map((t) => t.id));
const initial = (): Saved => ({
  version: 1,
  tasks: {},
  preferences: defaults,
  study: emptyStudy(),
});
export function progressOf(task: Task): Progress {
  return {
    status: task.status,
    evidence: task.evidence,
    nextAction: task.nextAction,
    actual: Number(task.actual),
    confidence: task.confidence,
    completedOn: task.completedOn,
    technical: task.technical,
    communication: task.communication,
    mockResult: task.mockResult,
  };
}
function readSaved(): Saved {
  const stored = JSON.parse(localStorage.getItem(KEY) || "null");
  if (!stored) return initial();
  if (stored.version !== 1)
    throw new Error(
      "Saved progress has an unsupported format. Export or recover your backup before changing it.",
    );
  const tasks: Record<string, Progress> = {};
  for (const [id, value] of Object.entries(stored.tasks || {}))
    if (ids.has(id) && validateProgress(value)) tasks[id] = value;
  const p = stored.preferences || {};
  if (stored.study && !validateStudy(stored.study, ids))
    throw new Error(
      "Saved timer history could not be read. Your stored data has been kept unchanged.",
    );
  return {
    version: 1,
    tasks,
    preferences: {
      week:
        Number.isInteger(p.week) && p.week >= 1 && p.week <= 24 ? p.week : 1,
      query: typeof p.query === "string" ? p.query : "",
      category: typeof p.category === "string" ? p.category : "",
      status: typeof p.status === "string" ? p.status : "",
    },
    study: stored.study || emptyStudy(),
  };
}
export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Saved>(initial);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    function load() {
      try {
        setData(readSaved());
        setLoaded(true);
        setError("");
      } catch (failure) {
        setError(
          failure instanceof Error
            ? failure.message
            : "Saved progress could not be read.",
        );
      }
    }
    const timeout = setTimeout(load, 0);
    const onStorage = (event: StorageEvent) => {
      if (event.key === KEY || event.key === null) load();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  async function change(update: (next: Saved) => void): Promise<boolean> {
    try {
      if (!loaded) throw new Error("Wait for saved progress to load first.");
      if (!navigator.locks)
        throw new Error(
          "This browser cannot safely coordinate timers between tabs. Use a current browser over HTTPS or localhost.",
        );
      await navigator.locks.request(KEY, () => {
        const next = readSaved();
        update(next);
        localStorage.setItem(KEY, JSON.stringify(next));
        setData(next);
      });
      setError("");
      return true;
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Could not save. Check browser storage.",
      );
      return false;
    }
  }
  function current(next: Saved, id: string) {
    const source = originalTasks.find((t) => t.id === id);
    if (!source) throw new Error("Task not found.");
    return { ...source, ...next.tasks[id] };
  }
  function settle(next: Saved) {
    const active = next.study.active;
    if (!active || active.startedAt === null) return;
    const result = finishSegment(next.study, Date.now(), crypto.randomUUID());
    const task = current(next, active.taskId);
    next.tasks[task.id] = {
      ...progressOf(task),
      actual:
        Math.round((Number(task.actual) + result.hours) * 1000000) / 1000000,
    };
    next.study = result.study;
  }
  async function save(id: string, value: Progress) {
    if (!editing || !validateProgress(value)) return false;
    return change((next) => {
      if (value.status === "Done") {
        if (!isComplete({ ...current(next, id), ...value }))
          throw new Error(
            "Completion needs evidence, a date, and any required mock results.",
          );
      }
      if (value.status !== "In progress" && next.study.active?.taskId === id) {
        settle(next);
        next.study.active = null;
      }
      // The evidence form must never overwrite hours recorded while it was open.
      next.tasks[id] = { ...value, actual: Number(current(next, id).actual) };
    });
  }
  async function timerAction(id: string, action: "start" | "pause" | "stop") {
    return change((next) => {
      const task = current(next, id);
      if (action === "start") {
        if (["Done", "Blocked"].includes(task.status))
          throw new Error(
            "Reopen or unblock this task before starting a timer.",
          );
        if (next.study.active && next.study.active.taskId !== id)
          throw new Error(
            "Stop the other task timer before starting this task.",
          );
        if (next.study.active?.startedAt != null) return;
        next.study.active = { taskId: id, startedAt: Date.now() };
        next.tasks[id] = { ...progressOf(task), status: "In progress" };
      } else {
        if (next.study.active?.taskId !== id) return;
        settle(next);
        if (action === "stop") next.study.active = null;
      }
    });
  }
  async function correctHours(id: string, hours: number, note: string) {
    return change((next) => {
      if (!Number.isFinite(hours) || hours < 0 || !note.trim())
        throw new Error("Enter valid hours and a reason for the correction.");
      if (next.study.active?.taskId === id)
        throw new Error("Stop this task timer before correcting hours.");
      const task = current(next, id);
      next.study.corrections.push({
        id: crypto.randomUUID(),
        taskId: id,
        at: Date.now(),
        before: Number(task.actual),
        after: hours,
        note: note.trim(),
      });
      next.tasks[id] = { ...progressOf(task), actual: hours };
    });
  }
  function exportProgress() {
    try {
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(readSaved(), null, 2)], {
          type: "application/json",
        }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "learnspace-progress.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("Could not export saved progress.");
    }
  }
  return (
    <TrackerContext.Provider
      value={{
        tasks: originalTasks.map((t) => ({ ...t, ...data.tasks[t.id] })),
        editing,
        setEditing,
        preferences: data.preferences,
        setPreferences: (patch) => {
          void change((next) => {
            next.preferences = { ...next.preferences, ...patch };
          });
        },
        save,
        error,
        loaded,
        localCount: Object.keys(data.tasks).length,
        localProgress: data.tasks,
        study: data.study,
        timerAction,
        correctHours,
        exportProgress,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
export function useTracker() {
  const value = useContext(TrackerContext);
  if (!value) throw new Error("TrackerProvider is required");
  return value;
}
