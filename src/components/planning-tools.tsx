"use client";
import Link from "next/link";
import { useState } from "react";
import { useTracker } from "./tracker-provider";
import { useStudyClock } from "./study-timer";
import { formatDate, isComplete, tasks as baseline } from "@/lib/tracker";
import {
  addDays,
  missingPrerequisites,
  parseBackup,
  readyTasks,
  reviewQueue,
  taskDates,
  type Backup,
} from "@/lib/planner";
import { studyDate, todayStudyMs } from "@/lib/study";
import { InstallApp, OfflineTask } from "./pwa-controls";

export function downloadText(
  name: string,
  text: string,
  type = "text/markdown",
) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function TodayView() {
  const { tasks, study, planner, timerAction, loaded } = useTracker();
  const now = useStudyClock();
  const today = now ? studyDate(now) : planner.schedule.start;
  const ready = readyTasks(tasks);
  const active = tasks.find((t) => t.id === study.active?.taskId);
  const [message, setMessage] = useState("");
  const available = planner.schedule.days.includes(
    new Date(today + "T00:00:00Z").getUTCDay(),
  )
    ? Math.max(
        0,
        planner.schedule.capacity / planner.schedule.days.length -
          (now ? todayStudyMs(study, now) / 3600000 : 0),
      )
    : 0;
  return (
    <div className="tools-page">
      <h1>Today’s learning</h1>
      <p>{formatDate(today)} · Choose one achievable step.</p>
      <div className="tools-grid">
        <section className="panel tool-card">
          <h2>{active ? "Continue your task" : "Ready to begin"}</h2>
          {active ? (
            <>
              <Link href={`/tasks/${active.id}`}>
                {active.id} · {active.title}
              </Link>
              <p>
                {active.nextAction ||
                  "Open your task and continue your experiment."}
              </p>
              <button
                className="button primary"
                onClick={async () =>
                  setMessage(
                    (await timerAction(
                      active.id,
                      study.active?.startedAt === null ? "start" : "pause",
                    ))
                      ? "Timer updated."
                      : "Check the storage message.",
                  )
                }
              >
                {study.active?.startedAt === null ? "Resume" : "Pause & save"}
              </button>
            </>
          ) : (
            <p>No timer running. Choose a task below.</p>
          )}
          <p role="status">{message}</p>
        </section>
        <section className="panel tool-card">
          <h2>Available study time</h2>
          <strong>{available.toFixed(1)} h today</strong>
          <p>
            Weekly capacity {planner.schedule.capacity} h across{" "}
            {planner.schedule.days.length} study days. This is a planning guide,
            not a limit.
          </p>
          <Link href="/settings">Adjust your schedule →</Link>
        </section>
      </div>
      <section className="panel tool-card">
        <h2>Ready tasks</h2>
        <p>
          Prerequisite task IDs are complete. Read any additional written
          prerequisites in the task.
        </p>
        {ready.slice(0, 8).map((t) => (
          <div className="tool-row" key={t.id}>
            <div>
              <Link href={`/tasks/${t.id}`}>
                {t.id} · {t.title}
              </Link>
              <p>
                {t.nextAction || t.doneWhen} · Due {formatDate(t.dueDate)}{" "}
                {t.dueDate < today ? "· Overdue" : ""}
              </p>
            </div>
            <button
              className="button secondary"
              disabled={!loaded || !!study.active}
              onClick={async () =>
                setMessage(
                  (await timerAction(t.id, "start"))
                    ? `${t.id} started.`
                    : "Could not start.",
                )
              }
            >
              Start
            </button>
          </div>
        ))}
        {!ready.length && (
          <p>No ready tasks. Review blockers in your Master plan.</p>
        )}
      </section>
      <section className="panel tool-card">
        <h2>Needs attention</h2>
        {tasks
          .filter(
            (t) =>
              !isComplete(t) &&
              (t.status === "Blocked" || missingPrerequisites(t, tasks).length),
          )
          .slice(0, 8)
          .map((t) => (
            <p key={t.id}>
              <Link href={`/tasks/${t.id}`}>
                {t.id} · {t.title}
              </Link>{" "}
              —{" "}
              {t.status === "Blocked"
                ? t.nextAction || "Blocked"
                : `Complete ${missingPrerequisites(t, tasks).join(", ")} first`}
            </p>
          ))}
        <Link href="/reviews">Open your revision queue →</Link>
      </section>
    </div>
  );
}
export function ReviewView() {
  const { tasks, study, planner, recordReview, loaded } = useTracker();
  const now = useStudyClock();
  const today = now ? studyDate(now) : planner.schedule.start;
  const [week, setWeek] = useState(1);
  const [message, setMessage] = useState("");
  const queue = reviewQueue(tasks, planner.reviews);
  const start = addDays(planner.schedule.start, (week - 1) * 7),
    end = addDays(start, 6);
  const planned = tasks.filter((t) => t.startWeek <= week && t.endWeek >= week);
  const hours = study.sessions.reduce(
    (sum, s) =>
      sum +
      Math.max(
        0,
        Math.min(s.endedAt, Date.parse(addDays(end, 1) + "T00:00:00+05:30")) -
          Math.max(s.startedAt, Date.parse(start + "T00:00:00+05:30")),
      ) /
        3600000,
    0,
  );
  return (
    <div className="tools-page">
      <h1>Review & reflect</h1>
      <section className="panel tool-card">
        <h2>Weekly review</h2>
        <label>
          Week{" "}
          <select
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <p>
          {formatDate(start)} – {formatDate(end)}
        </p>
        <div className="tools-grid">
          <p>
            <strong>
              {planned
                .reduce(
                  (s, t) =>
                    s + Number(t.estimate) / (t.endWeek - t.startWeek + 1),
                  0,
                )
                .toFixed(1)}{" "}
              h
            </strong>
            <br />
            Estimated allocation
          </p>
          <p>
            <strong>{hours.toFixed(2)} h</strong>
            <br />
            Recorded sessions this week
          </p>
          <p>
            <strong>
              {
                tasks.filter(
                  (t) =>
                    isComplete(t) &&
                    t.completedOn >= start &&
                    t.completedOn <= end,
                ).length
              }
            </strong>
            <br />
            Completed this week
          </p>
          <p>
            <strong>
              {planned.filter((t) => t.status === "Blocked").length}
            </strong>
            <br />
            Blocked planned tasks
          </p>
        </div>
        <p>
          Weekly capacity: {planner.schedule.capacity} h. Session totals exclude
          manual corrections and running time. Estimates for multi-week tasks
          are spread evenly.
        </p>
        <h3>Topics to revisit</h3>
        {planned
          .filter((t) => Number(t.confidence) < 3)
          .slice(0, 6)
          .map((t) => (
            <p key={t.id}>
              <Link href={`/tasks/${t.id}`}>
                {t.id} · {t.title}
              </Link>{" "}
              — confidence {t.confidence}/5
            </p>
          ))}
      </section>
      <section className="panel tool-card">
        <h2>Revision queue</h2>
        <p>
          Review after 1, 3, 7, and 14 days from completion. Open the task,
          recall the concept without notes, then record the review.
        </p>
        <p role="status">{message}</p>
        {queue.slice(0, 40).map((r) => (
          <div className="tool-row" key={r.key}>
            <div>
              <Link href={`/tasks/${r.task.id}`}>
                {r.task.id} · {r.task.title}
              </Link>
              <p>
                Day {r.days} review · {formatDate(r.due)} ·{" "}
                {r.due <= today ? "Due" : "Upcoming"}
              </p>
            </div>
            <button
              className="button secondary"
              disabled={!loaded || r.due > today}
              onClick={async () =>
                setMessage(
                  (await recordReview(r.key, today))
                    ? "Review recorded."
                    : "Review could not be saved.",
                )
              }
            >
              Reviewed
            </button>
          </div>
        ))}
        {!queue.length && (
          <p>
            No reviews waiting. Complete a task with evidence to create its
            review schedule.
          </p>
        )}
        <p>
          {Object.keys(planner.reviews).length} reviews recorded · Showing the
          first 40 pending reviews.
        </p>
      </section>
    </div>
  );
}
export function TaskJournal({ id }: { id: string }) {
  const { planner, addJournal, loaded } = useTracker();
  const [text, setText] = useState(""),
    [kind, setKind] = useState("Note"),
    [message, setMessage] = useState("");
  const entries = planner.journal.filter((j) => j.taskId === id);
  return (
    <section className="panel tool-card">
      <h2>Quick learning journal</h2>
      <p>
        Private to this browser. Export Markdown into your task’s notes folder
        when ready.
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (
            await addJournal({
              taskId: id,
              at: studyDate(Date.now()),
              kind,
              text: text.trim(),
            })
          ) {
            setText("");
            setMessage("Journal entry saved.");
          }
        }}
      >
        <label>
          Entry type
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            {["Note", "Question", "Mistake", "Reflection"].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label>
          Your thought
          <textarea
            required
            maxLength={20000}
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button className="button primary" disabled={!loaded || !text.trim()}>
          Save journal entry
        </button>
      </form>
      <p role="status">{message}</p>
      <button
        className="button secondary"
        disabled={!entries.length}
        onClick={() =>
          downloadText(
            `${id}-journal.md`,
            entries
              .map((j) => `## ${j.at} · ${j.kind}\n\n${j.text}`)
              .join("\n\n"),
          )
        }
      >
        Export journal as Markdown
      </button>
      <div className="journal-entries">
        {entries
          .slice()
          .reverse()
          .map((j) => (
            <article key={j.id}>
              <b>
                {j.at} · {j.kind}
              </b>
              <p>{j.text}</p>
            </article>
          ))}
      </div>
      <OfflineTask id={id} />
    </section>
  );
}
export function SettingsView() {
  const {
    planner,
    updateSchedule,
    restoreBackup,
    exportProgress,
    localProgress,
    study,
    loaded,
  } = useTracker();
  const [schedule, setSchedule] = useState(planner.schedule),
    [preview, setPreview] = useState(false),
    [backup, setBackup] = useState<{ text: string; data: Backup } | null>(null),
    [mode, setMode] = useState<"merge" | "replace">("merge"),
    [message, setMessage] = useState(""),
    [confirm, setConfirm] = useState(false);
  const changed = baseline.filter((t) => {
    try {
      return taskDates(t, schedule).due !== taskDates(t, planner.schedule).due;
    } catch {
      return false;
    }
  });
  return (
    <div className="tools-page">
      <h1>Settings & backups</h1>
      <section className="panel tool-card">
        <h2>Install & offline access</h2>
        <InstallApp expanded />
      </section>
      <section className="panel tool-card">
        <h2>Your schedule</h2>
        <p>
          Changes affect app dates only. Update your spreadsheet’s schedule
          separately. Capacity does not automatically redistribute tasks.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPreview(true);
          }}
        >
          <div className="tools-grid">
            <label>
              Plan start
              <input
                required
                type="date"
                min="2000-01-01"
                max="2100-01-01"
                value={schedule.start}
                onChange={(e) => {
                  setPreview(false);
                  setSchedule({ ...schedule, start: e.target.value });
                }}
              />
            </label>
            <label>
              Weekly capacity (hours)
              <input
                required
                type="number"
                min="0.5"
                max="168"
                step="0.5"
                value={schedule.capacity}
                onChange={(e) => {
                  setPreview(false);
                  setSchedule({
                    ...schedule,
                    capacity: Number(e.target.value),
                  });
                }}
              />
            </label>
            <label>
              Focus session (minutes)
              <input
                required
                type="number"
                min="5"
                max="120"
                value={schedule.focus}
                onChange={(e) => {
                  setPreview(false);
                  setSchedule({ ...schedule, focus: Number(e.target.value) });
                }}
              />
            </label>
            <label>
              Break (minutes)
              <input
                required
                type="number"
                min="1"
                max="60"
                value={schedule.breakMinutes}
                onChange={(e) => {
                  setPreview(false);
                  setSchedule({
                    ...schedule,
                    breakMinutes: Number(e.target.value),
                  });
                }}
              />
            </label>
          </div>
          <fieldset>
            <legend>Study days</legend>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
              <label className="day-choice" key={d}>
                <input
                  type="checkbox"
                  checked={schedule.days.includes(i)}
                  onChange={(e) => {
                    setPreview(false);
                    setSchedule({
                      ...schedule,
                      days: e.target.checked
                        ? [...schedule.days, i]
                        : schedule.days.filter((n) => n !== i),
                    });
                  }}
                />
                {d}
              </label>
            ))}
          </fieldset>
          <button className="button secondary" disabled={!schedule.days.length}>
            Preview schedule
          </button>
        </form>
        {preview && (
          <div className="inline-notice">
            <p>
              {changed.length} task deadlines change. Plan ends{" "}
              {formatDate(addDays(schedule.start, 167))}. Task weeks stay fixed;
              starts and deadlines use your selected study days.
            </p>
            <div className="schedule-preview">
              {changed.map((t) => (
                <p key={t.id}>
                  {t.id}: {formatDate(taskDates(t, planner.schedule).due)} →{" "}
                  {formatDate(taskDates(t, schedule).due)}
                </p>
              ))}
            </div>
            <button
              className="button primary"
              disabled={!loaded}
              onClick={async () => {
                if (await updateSchedule(schedule)) {
                  setPreview(false);
                  setMessage("Schedule saved.");
                }
              }}
            >
              Save this schedule
            </button>
          </div>
        )}
      </section>
      <section className="panel tool-card">
        <h2>Backup & restore</h2>
        <button className="button secondary" onClick={exportProgress}>
          Export complete backup
        </button>
        <p>
          Includes progress, sessions, corrections, journals, reviews and
          schedule. No Google tokens. Stop the timer before restoring. Export
          your current data first.
        </p>
        <label>
          Choose backup JSON
          <input
            type="file"
            accept=".json,application/json"
            onChange={async (e) => {
              setBackup(null);
              setConfirm(false);
              try {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 10 * 1024 * 1024)
                  throw new Error("Choose a file under 10 MB.");
                const text = await file.text();
                setBackup({ text, data: parseBackup(text) });
                setMessage("Backup validated. Review below before restoring.");
              } catch (err) {
                setMessage(
                  err instanceof Error ? err.message : "Invalid backup.",
                );
              }
            }}
          />
        </label>
        {backup && (
          <>
            <p>
              Preview: {Object.keys(backup.data.tasks).length} task records,{" "}
              {backup.data.study.sessions.length} sessions,{" "}
              {backup.data.planner.journal.length} journal entries,{" "}
              {Object.keys(backup.data.planner.reviews).length} reviews.
            </p>
            <p>
              {
                Object.keys(backup.data.tasks).filter((id) =>
                  Object.hasOwn(localProgress, id),
                ).length
              }{" "}
              tasks overlap with this browser. Imported active timers will be
              stopped; unsaved running time is not added.
            </p>
            <label>
              Restore method
              <select
                value={mode}
                onChange={(e) => {
                  setMode(e.target.value as "merge" | "replace");
                  setConfirm(false);
                }}
              >
                <option value="merge">
                  Merge: keep existing task progress and schedule
                </option>
                <option value="replace">
                  Replace: use backup progress and schedule
                </option>
              </select>
            </label>
            <p>
              Merge imports new tasks and their time history, plus unique
              journals and reviews. Existing task totals are not summed. Replace
              replaces all local progress and history.
            </p>
            <label>
              <input
                type="checkbox"
                checked={confirm}
                onChange={(e) => setConfirm(e.target.checked)}
              />{" "}
              I have reviewed this {mode} and exported my current data.
            </label>
            <button
              className="button primary"
              disabled={!loaded || !confirm || !!study.active}
              onClick={async () => {
                if (await restoreBackup(backup.text, mode)) {
                  setBackup(null);
                  setMessage(
                    "Backup restored. Refresh Settings to load the restored schedule into its form.",
                  );
                }
              }}
            >
              Restore reviewed backup
            </button>
          </>
        )}
        <button
          className="button secondary"
          onClick={() => {
            const recovery = localStorage.getItem("learnspace-before-restore");
            if (recovery)
              downloadText(
                "learnspace-before-restore.json",
                recovery,
                "application/json",
              );
            else setMessage("No previous restore recovery copy yet.");
          }}
        >
          Download pre-restore recovery copy
        </button>
      </section>
      <p role="status">{message}</p>
    </div>
  );
}
