"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, Play, Pause, CalendarDays } from "lucide-react";
import { useTracker } from "./tracker-provider";
import { useStudyClock } from "./study-timer";
import { TaskList, Status } from "./task-list";
import { addDays, readyTasks } from "@/lib/planner";
import { categories, formatDate, isComplete, slug } from "@/lib/tracker";
import { clockText, elapsedMs, studyDate, todayStudyMs } from "@/lib/study";

export function LearningOverview() {
  const { tasks, study, planner, loaded, timerAction, localCount } =
    useTracker();
  const now = useStudyClock();
  const today = now ? studyDate(now) : planner.schedule.start;
  const ready = readyTasks(tasks);
  const current =
    tasks.find((task) => task.id === study.active?.taskId) || ready[0];
  const running = !!study.active && study.active.startedAt !== null;
  const pending = tasks.filter((task) => !isComplete(task));
  const due = pending
    .filter((task) => task.dueDate <= addDays(today, 7))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const core = tasks.filter((task) => task.scope === "Core");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function act() {
    if (!current) return;
    setBusy(true);
    try {
      const ok = await timerAction(current.id, running ? "pause" : "start");
      setMessage(
        ok
          ? running
            ? "Session paused and time saved."
            : "Timer started. Open the task to begin."
          : "Could not update the timer. Check the storage message and try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="catalog-overview">
      <header className="page-heading">
        <div>
          <h1>Learning overview</h1>
          <p>{formatDate(today)} · Your tasks, schedule, and curriculum.</p>
        </div>
        <Link className="button secondary" href="/weeks">
          <CalendarDays size={16} />
          Weekly plan
        </Link>
      </header>
      <div className="catalog-summary">
        <span>
          {localCount ? "Your saved progress" : "Workbook starting progress"}
        </span>
        <span>
          <b>
            {core.filter(isComplete).length} / {core.length}
          </b>{" "}
          core tasks complete
        </span>
        <span>
          <b>
            {tasks
              .reduce((sum, task) => sum + Number(task.actual || 0), 0)
              .toFixed(1)}{" "}
            h
          </b>{" "}
          recorded
        </span>
        <Link href="/reviews">
          Review progress <ArrowRight size={14} />
        </Link>
      </div>
      <div className="catalog-workbench">
        <section className="catalog-current" aria-labelledby="current-heading">
          <div className="catalog-section-top">
            <h2 id="current-heading">
              {study.active ? "Current task" : "Next ready task"}
            </h2>
            {current && (
              <Status
                value={
                  study.active
                    ? running
                      ? "In progress"
                      : "Paused"
                    : current.status
                }
              />
            )}
          </div>
          {current ? (
            <>
              <div className="catalog-task-meta">
                <span>{current.id}</span>
                <span>{current.category}</span>
                <span>{current.priority} priority</span>
              </div>
              <h3>
                <Link href={`/tasks/${current.id}`}>{current.title}</Link>
              </h3>
              <p className="catalog-outcome">
                {current.nextAction || current.doneWhen}
              </p>
              <dl className="catalog-task-facts">
                <div>
                  <dt>Due date</dt>
                  <dd>{formatDate(current.dueDate)}</dd>
                </div>
                <div>
                  <dt>Estimated effort</dt>
                  <dd>{current.estimate} hours</dd>
                </div>
                <div>
                  <dt>{study.active ? "Current segment" : "Task status"}</dt>
                  <dd>
                    {study.active
                      ? clockText(now ? elapsedMs(study.active, now) : 0)
                      : current.status}
                  </dd>
                </div>
              </dl>
              <div className="catalog-actions">
                <button
                  className="button primary"
                  disabled={!loaded || busy}
                  onClick={act}
                >
                  {running ? <Pause size={16} /> : <Play size={16} />}{" "}
                  {busy
                    ? "Saving…"
                    : running
                      ? "Pause & save"
                      : study.active
                        ? "Resume task"
                        : "Start task"}
                </button>
                <Link
                  className="button secondary"
                  href={`/tasks/${current.id}`}
                >
                  Open workspace <ArrowRight size={16} />
                </Link>
              </div>
              <p className="catalog-feedback" role="status">
                {message}
              </p>
            </>
          ) : (
            <div className="empty-state">
              <h3>No ready tasks</h3>
              <p>Review prerequisites or blocked tasks in your master plan.</p>
              <Link href="/plan">Open master plan</Link>
            </div>
          )}
        </section>
        <aside className="catalog-schedule" aria-label="Study schedule">
          <h2>Your schedule</h2>
          <dl>
            <div>
              <dt>Today’s study time</dt>
              <dd>{now ? clockText(todayStudyMs(study, now)) : "—"}</dd>
            </div>
            <div>
              <dt>Weekly capacity</dt>
              <dd>{planner.schedule.capacity} hours</dd>
            </div>
            <div>
              <dt>Plan starts</dt>
              <dd>{formatDate(planner.schedule.start)}</dd>
            </div>
            <div>
              <dt>Plan ends</dt>
              <dd>{formatDate(addDays(planner.schedule.start, 167))}</dd>
            </div>
          </dl>
          <Link href="/settings">
            Adjust schedule <ArrowRight size={14} />
          </Link>
          <p>
            Session time includes the running timer. Manual corrections affect
            task totals.
          </p>
        </aside>
      </div>
      <div className="catalog-lists">
        <section className="catalog-next">
          <div className="catalog-section-top">
            <h2>Ready to work on</h2>
            <Link href="/today">
              View today <ArrowRight size={14} />
            </Link>
          </div>
          <TaskList
            compact
            items={ready.filter((task) => task.id !== current?.id).slice(0, 4)}
          />
          <details className="catalog-disclosure">
            <summary>How tasks are selected</summary>
            <p>
              Tasks with completed prerequisite IDs are ordered by deadline and
              priority. Read the full prerequisites before starting.
            </p>
          </details>
        </section>
        <section className="catalog-deadlines">
          <div className="catalog-section-top">
            <h2>Due in the next 7 days</h2>
            <span>{due.length} tasks</span>
          </div>
          {due.length ? (
            <ul>
              {due.slice(0, 5).map((task) => (
                <li key={task.id}>
                  <Link href={`/tasks/${task.id}`}>
                    <span>
                      {task.id} · {task.title}
                    </span>
                    <small
                      className={task.dueDate < today ? "deadline-overdue" : ""}
                    >
                      {task.dueDate < today ? "Overdue · " : ""}
                      {formatDate(task.dueDate)}
                    </small>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No deadlines in the next seven days.</p>
          )}
          <Link href="/plan">
            View master plan <ArrowRight size={14} />
          </Link>
        </section>
      </div>
      <section className="catalog-curriculum">
        <div className="catalog-section-top">
          <div>
            <h2>Browse the curriculum</h2>
            <p>
              The complete plan is available to read without editing progress.
            </p>
          </div>
          <Link href="/learning">
            <BookOpen size={16} /> Learning files
          </Link>
        </div>
        <div className="catalog-track-list">
          {categories.map((category) => {
            const items = tasks.filter((task) => task.category === category);
            return (
              <Link key={category} href={`/tracks/${slug(category)}`}>
                <span>{category}</span>
                <small>{items.length} tasks</small>
                <ArrowRight size={15} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
