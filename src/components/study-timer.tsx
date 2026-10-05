"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTracker } from "./tracker-provider";
import { formatDate, isComplete, tracker, type Task } from "@/lib/tracker";
import {
  clockText,
  elapsedMs,
  planDate,
  studyDate,
  todayStudyMs,
  STUDY_TIME_ZONE,
} from "@/lib/study";

export function useStudyClock() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const first = setTimeout(refresh, 0);
    const interval = setInterval(refresh, 1000);
    window.addEventListener("focus", refresh);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      window.removeEventListener("focus", refresh);
    };
  }, []);
  return now;
}
function dateTime(value: number) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: STUDY_TIME_ZONE,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}
export function TaskTimer({
  task,
  onComplete,
}: {
  task: Task;
  onComplete: () => void;
}) {
  const { study, timerAction, correctHours, loaded, setEditing, error } =
    useTracker();
  const now = useStudyClock();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");
  const active = study.active?.taskId === task.id ? study.active : null;
  const running = active?.startedAt != null;
  const live = active && now ? elapsedMs(active, now) : 0;
  const total = Number(task.actual) * 3600000 + live;
  const remaining = Number(task.estimate) * 3600000 - total;
  async function act(action: "start" | "pause" | "stop", complete = false) {
    setBusy(true);
    setMessage("");
    if (await timerAction(task.id, action)) {
      setEditing(true);
      setMessage(
        action === "start"
          ? "Timer started. It continues until you pause or stop."
          : "Time saved to this task’s Actual hours.",
      );
      if (complete) onComplete();
    }
    setBusy(false);
  }
  const sessions = study.sessions.filter((s) => s.taskId === task.id);
  return (
    <section className="panel study-timer" aria-label="Task timer">
      <div className="study-timer-top">
        <div>
          <div className="eyebrow">FOCUS ON ONE TASK</div>
          <h2>
            {running
              ? "Session in progress"
              : active
                ? "Timer paused"
                : "Ready when you are"}
          </h2>
        </div>
        <span className="phase-pill">
          {running ? "Running" : active ? "Paused" : "Stopped"}
        </span>
      </div>
      <div className="study-metrics">
        <div>
          <span>
            {remaining < 0 ? "Over estimate" : "Estimated time remaining"}
          </span>
          <strong className={remaining < 0 ? "study-overtime" : ""}>
            {clockText(Math.abs(remaining))}
          </strong>
        </div>
        <div>
          <span>Current session</span>
          <strong>{clockText(live)}</strong>
        </div>
        <div>
          <span>Actual hours · saved + running</span>
          <strong>{(total / 3600000).toFixed(3)} h</strong>
        </div>
        <div>
          <span>Planned start → due</span>
          <b>
            {formatDate(planDate((task.startWeek - 1) * 7))}
            <br />
            {formatDate(task.dueDate)}
          </b>
        </div>
      </div>
      {remaining <= 0 && running && (
        <p role="status" className="inline-notice">
          You have reached the estimate. Overtime is still being recorded; pause
          when you take a break.
        </p>
      )}
      <div className="study-actions">
        {!running && (
          <button
            className="button primary"
            disabled={
              !loaded ||
              busy ||
              ["Done", "Blocked"].includes(task.status) ||
              (!!study.active && !active)
            }
            onClick={() => void act("start")}
          >
            {active ? "Resume task" : "Start task"}
          </button>
        )}
        {running && (
          <button
            className="button secondary"
            disabled={busy}
            onClick={() => void act("pause")}
          >
            Pause timer
          </button>
        )}
        {active && (
          <button
            className="button secondary"
            disabled={busy}
            onClick={() => void act("stop")}
          >
            Stop & save time
          </button>
        )}
        {!isComplete(task) && (
          <button
            className="button secondary"
            disabled={!loaded || busy}
            onClick={() => void act("stop", true)}
          >
            Complete task & add evidence
          </button>
        )}
      </div>
      {study.active && !active && (
        <p>
          Another task has the timer.{" "}
          <Link href={`/tasks/${study.active.taskId}`}>
            Open {study.active.taskId}
          </Link>{" "}
          and stop it before starting this one.
        </p>
      )}
      <p className="study-help">
        The timer continues through refreshes, tab changes, and browser closure.
        Pause for breaks. Saved hours include earlier entries; corrections need
        a reason. Dates use Sri Lanka time.
      </p>
      <p role="status">{message}</p>
      {error && <p role="alert">{error}</p>}
      <details>
        <summary>
          Session history & time corrections ({sessions.length} sessions)
        </summary>
        <p>
          Recorded sessions:{" "}
          {(
            sessions.reduce((sum, s) => sum + s.durationMs, 0) / 3600000
          ).toFixed(3)}{" "}
          h. Previous manual hours and corrections also contribute to Actual
          hours.
        </p>
        <ul className="study-history">
          {sessions
            .slice()
            .reverse()
            .map((s) => (
              <li key={s.id}>
                <span>
                  {dateTime(s.startedAt)} → {dateTime(s.endedAt)}
                </span>
                <strong>{clockText(s.durationMs)}</strong>
              </li>
            ))}
        </ul>
        {study.corrections
          .filter((c) => c.taskId === task.id)
          .map((c) => (
            <p key={c.id}>
              {dateTime(c.at)} · {c.before.toFixed(3)} → {c.after.toFixed(3)} h
              · {c.note}
            </p>
          ))}
        <form
          className="study-correction"
          onSubmit={async (event) => {
            event.preventDefault();
            setBusy(true);
            if (await correctHours(task.id, Number(hours), note)) {
              setMessage("Hours corrected; the reason is saved in history.");
              setHours("");
              setNote("");
            }
            setBusy(false);
          }}
        >
          <label>
            Correct total actual hours
            <input
              type="number"
              min="0"
              step="any"
              required
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </label>
          <label>
            Reason for correction
            <input
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="For example: forgot to pause during lunch"
            />
          </label>
          <button
            className="button secondary"
            disabled={busy || !!active || !loaded}
          >
            Save correction
          </button>
        </form>
      </details>
    </section>
  );
}
export function ActiveStudyBar() {
  const { study, tasks, timerAction } = useTracker();
  const now = useStudyClock();
  const [busy, setBusy] = useState(false);
  if (!study.active) return null;
  const task = tasks.find((t) => t.id === study.active!.taskId)!;
  return (
    <div className="study-active-bar">
      <Link href={`/tasks/${task.id}`}>
        {study.active.startedAt === null ? "Paused" : "Running"} · {task.id} ·{" "}
        {task.title}
      </Link>
      <strong>{clockText(now ? elapsedMs(study.active, now) : 0)}</strong>
      <button
        className="button secondary"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          await timerAction(
            task.id,
            study.active!.startedAt === null ? "start" : "pause",
          );
          setBusy(false);
        }}
      >
        {study.active.startedAt === null ? "Resume" : "Pause"}
      </button>
    </div>
  );
}
export function StudyDashboard() {
  const { tasks, study } = useTracker();
  const now = useStudyClock();
  const today = now ? studyDate(now) : tracker.settings.startDate;
  const unfinished = tasks.filter((t) => !isComplete(t));
  const overdue = unfinished.filter((t) => t.dueDate < today);
  const ordered = unfinished
    .filter((t) => t.status !== "Blocked" && t.id !== study.active?.taskId)
    .sort(
      (a, b) =>
        a.dueDate.localeCompare(b.dueDate) ||
        a.priority.localeCompare(b.priority) ||
        a.startWeek - b.startWeek ||
        a.id.localeCompare(b.id, undefined, { numeric: true }),
    );
  const next = ordered[0];
  return (
    <section className="study-dashboard" aria-label="Your study schedule">
      <div className="panel study-card">
        <span>Plan starts</span>
        <strong>{formatDate(tracker.settings.startDate)}</strong>
        <p>24 weeks · ends {formatDate(planDate(167))}</p>
        <small>Week 1: 5–11 October · Sri Lanka time</small>
      </div>
      <div className="panel study-card">
        <span>Today’s study time</span>
        <strong>{now ? clockText(todayStudyMs(study, now)) : "—"}</strong>
        <p>Recorded sessions + current session</p>
        <small>
          Manual corrections affect task totals, not session history.
        </small>
      </div>
      <div className="panel study-card">
        <span>Deadlines</span>
        <strong>{now ? overdue.length : "—"} overdue</strong>
        <p>
          {unfinished.filter((t) => t.dueDate === today).length} due today ·{" "}
          {unfinished.filter((t) => t.status === "Blocked").length} blocked
        </p>
        <Link href="/plan">Review your plan →</Link>
      </div>
      <div className="panel study-card">
        <span>Next task</span>
        {next ? (
          <>
            <Link href={`/tasks/${next.id}`}>
              <strong>
                {next.id} · {next.title}
              </strong>
            </Link>
            <p>
              {next.priority} · Due {formatDate(next.dueDate)} · {next.estimate}
              h estimated
            </p>
            <small>
              Overdue first, then nearest deadline and priority. Check
              prerequisites before starting.
            </small>
          </>
        ) : (
          <strong>No pending unblocked tasks</strong>
        )}
      </div>
      <div className="panel study-upcoming">
        <h2>Coming up next</h2>
        {ordered.slice(0, 4).map((task) => (
          <Link key={task.id} href={`/tasks/${task.id}`}>
            <span>
              {task.id} · {task.title}
            </span>
            <b>{formatDate(task.dueDate)}</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
