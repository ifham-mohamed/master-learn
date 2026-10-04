"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { tasks as originalTasks, type Task } from "@/lib/tracker";
import { validateProgress, type Progress } from "@/lib/progress";

type Preferences = {
  week: number;
  query: string;
  category: string;
  status: string;
};
const defaults: Preferences = { week: 1, query: "", category: "", status: "" };
type Context = {
  tasks: Task[];
  editing: boolean;
  setEditing: (value: boolean) => void;
  preferences: Preferences;
  setPreferences: (patch: Partial<Preferences>) => void;
  save: (id: string, value: Progress) => boolean;
  error: string;
  localCount: number;
  exportProgress: () => void;
};
const TrackerContext = createContext<Context | null>(null);
const KEY = "learnspace-progress-v1";
export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, Progress>>({});
  const [preferences, updatePreferences] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || "null");
      if (stored?.version === 1) {
        const valid: Record<string, Progress> = {};
        for (const [id, value] of Object.entries(stored.tasks || {})) {
          if (originalTasks.some((t) => t.id === id) && validateProgress(value))
            valid[id] = value;
        }
        // Browser storage is loaded after hydration so the server and initial client render match.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOverrides(valid);
        const p = stored.preferences;
        if (p)
          updatePreferences({
            week:
              Number.isInteger(p.week) && p.week >= 1 && p.week <= 24
                ? p.week
                : 1,
            query: typeof p.query === "string" ? p.query : "",
            category: typeof p.category === "string" ? p.category : "",
            status: typeof p.status === "string" ? p.status : "",
          });
      }
    } catch {
      setError(
        "Saved preferences could not be read. Your original workbook is still available.",
      );
    }
  }, []);
  function persist(next: Record<string, Progress>, prefs: Preferences) {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ version: 1, tasks: next, preferences: prefs }),
      );
      setError("");
      return true;
    } catch {
      setError(
        "This browser could not save changes. Enable local storage and try again.",
      );
      return false;
    }
  }
  function save(id: string, value: Progress) {
    if (
      !editing ||
      !validateProgress(value) ||
      !originalTasks.some((t) => t.id === id)
    )
      return false;
    const next = { ...overrides, [id]: value };
    const original = originalTasks.find((t) => t.id === id)!;
    if (
      (Object.keys(value) as (keyof Progress)[]).every(
        (key) => value[key] === original[key],
      )
    )
      delete next[id];
    if (!persist(next, preferences)) return false;
    setOverrides(next);
    return true;
  }
  function setPreferences(patch: Partial<Preferences>) {
    const next = { ...preferences, ...patch };
    updatePreferences(next);
    persist(overrides, next);
  }
  function exportProgress() {
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            { version: 1, tasks: overrides, preferences },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "learnspace-progress.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <TrackerContext.Provider
      value={{
        tasks: originalTasks.map((t) => ({ ...t, ...overrides[t.id] })),
        preferences,
        setPreferences,
        editing,
        setEditing,
        save,
        error,
        localCount: Object.keys(overrides).length,
        exportProgress,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) throw new Error("TrackerProvider is required");
  return context;
}
