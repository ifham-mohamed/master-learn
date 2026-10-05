"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { TaskTimer } from "./study-timer";
import { planDate, studyDate } from "@/lib/study";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Save,
} from "lucide-react";
import { useTracker } from "./tracker-provider";
import { Status } from "./task-list";
import { ResourceLinks } from "./resource-links";
import {
  formatDate,
  isComplete,
  slug,
  tracker,
  type Task,
} from "@/lib/tracker";
import { statuses, type Progress } from "@/lib/progress";
import { LearningWorkspace } from "./learning-workspace";

export function TaskDetail({ id }: { id: string }) {
  const { tasks, editing, setEditing } = useTracker();
  const [completionRequest, setCompletionRequest] = useState(0);
  const task = tasks.find((t) => t.id === id)!;
  const prerequisites = task.prerequisites.match(/[A-Z]+\d+/g) || [];
  const reviewDue = task.completedOn
    ? new Date(
        Date.parse(`${task.completedOn}T00:00:00Z`) +
          tracker.settings.reviewInterval * 86400000,
      )
        .toISOString()
        .slice(0, 10)
    : "";
  return (
    <>
      <Link className="back-link" href={`/tracks/${slug(task.category)}`}>
        <ArrowLeft size={15} />
        Back to {task.category}
      </Link>
      <div className="page-heading detail-heading">
        <div>
          <div className="eyebrow">
            {task.id} · {task.category} · {task.section}
          </div>
          <h1>{task.title}</h1>
          <div className="detail-pills">
            <Status value={task.status} />
            <span className="phase-pill">
              {task.priority} · {task.scope}
            </span>
            <span>
              <CalendarDays size={15} />
              Week {task.startWeek}
              {task.endWeek !== task.startWeek ? `–${task.endWeek}` : ""}
            </span>
            <span>
              <Clock3 size={15} />
              {task.estimate}h estimated
            </span>
          </div>
        </div>
      </div>
      <TaskTimer
        task={task}
        onComplete={() => {
          setEditing(true);
          setCompletionRequest((value) => value + 1);
        }}
      />
      <LearningWorkspace key={id} taskId={id} />
      <div className="detail-layout">
        <div>
          <section className="panel detail-panel">
            <h2>What good looks like</h2>
            <p className="preserve-lines">{task.doneWhen}</p>
            {task.prompt && (
              <>
                <h2>Put it into practice</h2>
                <p className="preserve-lines">{task.prompt}</p>
              </>
            )}
            <ResourceLinks ids={task.sourceIds} taskId={task.id} />
          </section>
          <section className="panel detail-panel">
            <h2>Evidence & reflection</h2>
            <Link className="back-link" href="/sync">
              Review & sync saved progress to Google Sheets →
            </Link>
            <p className="preserve-lines">
              {task.evidence || "No evidence recorded yet."}
            </p>
            <h3>Next action / blocker</h3>
            <p className="preserve-lines">
              {task.nextAction || "No next action recorded."}
            </p>
            <div className="completion-note">
              <CheckCircle2 size={17} />
              {isComplete(task)
                ? "Complete with the required recorded evidence."
                : "Completion needs Done status, evidence, and a completion date. Mocks also need both scores and a result."}
            </div>
          </section>
          <details className="panel provenance">
            <summary>Original context & source references</summary>
            <dl>
              <dt>Origin</dt>
              <dd>{task.origin}</dd>
              <dt>Workbook location</dt>
              <dd>Master Plan · row {task.sourceRow}</dd>
              <dt>Original source rows</dt>
              <dd className="preserve-lines">
                {task.originalRows || "New gap task"}
              </dd>
              <dt>Original schedule</dt>
              <dd className="preserve-lines">
                {task.originalSchedule || "Not recorded"}
              </dd>
              <dt>Source IDs</dt>
              <dd>{task.sourceIds || "None recorded"}</dd>
            </dl>
          </details>
        </div>
        <aside>
          <section className="panel detail-panel">
            <h2>At a glance</h2>
            <dl>
              <dt>Work type</dt>
              <dd>{task.workType}</dd>
              <dt>Due date</dt>
              <dd>{formatDate(task.dueDate)}</dd>
              <dt>Planned start</dt>
              <dd>{formatDate(planDate((task.startWeek - 1) * 7))}</dd>
              <dt>Actual time</dt>
              <dd>{Number(task.actual).toFixed(3)} hours saved</dd>
              <dt>Confidence</dt>
              <dd>{task.confidence} / 5</dd>
              <dt>Completed on</dt>
              <dd>{formatDate(task.completedOn)}</dd>
              <dt>Review due</dt>
              <dd>{formatDate(reviewDue)}</dd>
              <dt>Practice mode</dt>
              <dd>{task.aiMode}</dd>
              {task.workType === "Mock" && (
                <>
                  <dt>Technical</dt>
                  <dd>
                    {task.technical === ""
                      ? "Not recorded"
                      : `${task.technical} / 5`}
                  </dd>
                  <dt>Communication</dt>
                  <dd>
                    {task.communication === ""
                      ? "Not recorded"
                      : `${task.communication} / 5`}
                  </dd>
                  <dt>Mock result</dt>
                  <dd>{task.mockResult || "Not recorded"}</dd>
                </>
              )}
            </dl>
            {prerequisites.length > 0 && (
              <div className="prerequisites">
                <h3>Before you begin</h3>
                {prerequisites.map((ref) => {
                  const prereq = tasks.find((t) => t.id === ref);
                  return prereq ? (
                    <Link key={ref} href={`/tasks/${ref}`}>
                      {ref} · {prereq.title}
                    </Link>
                  ) : (
                    <span key={ref}>{ref} · original reference</span>
                  );
                })}
              </div>
            )}
          </section>
          {editing ? (
            <ProgressForm
              key={task.id}
              task={task}
              completionRequest={completionRequest}
            />
          ) : (
            <section className="edit-invitation">
              <h3>Ready to record your progress?</h3>
              <p>
                Turn on editing to save evidence and task updates on this
                device.
              </p>
              <button
                className="button secondary"
                onClick={() => setEditing(true)}
              >
                Enable progress editing
              </button>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}

function ProgressForm({
  task,
  completionRequest,
}: {
  task: Task;
  completionRequest: number;
}) {
  const { save } = useTracker();
  const [message, setMessage] = useState("");
  const evidenceRef = useRef<HTMLTextAreaElement>(null);
  const [statusEdited, setStatusEdited] = useState(false);
  const [form, setForm] = useState<Progress>({
    status: task.status,
    evidence: task.evidence,
    nextAction: task.nextAction,
    actual: Number(task.actual),
    confidence: Number(task.confidence),
    completedOn: task.completedOn,
    technical: task.technical,
    communication: task.communication,
    mockResult: task.mockResult,
  });
  const patch = (value: Partial<Progress>) => {
    setForm({ ...form, ...value });
    setMessage("");
  };
  const isMock = task.workType === "Mock";
  useEffect(() => {
    if (!completionRequest) return;
    // Apply the explicit Complete task action while retaining evidence already typed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((previous) => ({
      ...previous,
      status: "Done",
      completedOn: previous.completedOn || studyDate(Date.now()),
    }));
    setStatusEdited(true);
    evidenceRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    evidenceRef.current?.focus({ preventScroll: true });
  }, [completionRequest]);
  return (
    <form
      className="panel progress-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const value = {
          ...form,
          status: statusEdited ? form.status : task.status,
        };
        if (value.status === "Done" && !isComplete({ ...task, ...value })) {
          setMessage(
            "Add evidence, a completion date, and any required mock results before marking Done.",
          );
          return;
        }
        setMessage(
          (await save(task.id, { ...value, actual: Number(task.actual) }))
            ? "Progress saved on this device."
            : "Progress could not be saved. Check the storage message above.",
        );
      }}
    >
      <h2>Record your progress</h2>
      <p>Saved only in this browser.</p>
      <label>
        Status
        <select
          value={statusEdited ? form.status : task.status}
          onChange={(e) => {
            setStatusEdited(true);
            patch({ status: e.target.value });
          }}
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label>
        Evidence / result
        <textarea
          ref={evidenceRef}
          value={form.evidence}
          required={form.status === "Done"}
          rows={4}
          onChange={(e) => patch({ evidence: e.target.value })}
          placeholder="What did you build, solve, or demonstrate?"
        />
      </label>
      <label>
        Next action / blocker
        <textarea
          value={form.nextAction}
          rows={2}
          onChange={(e) => patch({ nextAction: e.target.value })}
        />
      </label>
      <div className="form-grid">
        <label>
          Actual hours
          <input
            type="number"
            min="0"
            step="any"
            readOnly
            value={task.actual}
          />
          <small>
            Calculated from saved time. Use Session history & time corrections
            above to adjust.
          </small>
        </label>
        <label>
          Confidence (0–5)
          <input
            type="number"
            min="0"
            max="5"
            step="1"
            required
            value={form.confidence}
            onChange={(e) => patch({ confidence: Number(e.target.value) })}
          />
        </label>
      </div>
      <label>
        Completed on
        <input
          type="date"
          required={form.status === "Done"}
          value={form.completedOn}
          onChange={(e) => patch({ completedOn: e.target.value })}
        />
      </label>
      {isMock && (
        <>
          <div className="form-grid">
            <label>
              Technical (0–5)
              <input
                type="number"
                min="0"
                max="5"
                step="1"
                required={form.status === "Done"}
                value={form.technical}
                onChange={(e) =>
                  patch({
                    technical:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Communication (0–5)
              <input
                type="number"
                min="0"
                max="5"
                step="1"
                required={form.status === "Done"}
                value={form.communication}
                onChange={(e) =>
                  patch({
                    communication:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
              />
            </label>
          </div>
          <label>
            Mock result
            <select
              value={form.mockResult}
              required={form.status === "Done"}
              onChange={(e) => patch({ mockResult: e.target.value })}
            >
              <option value="">Not recorded</option>
              {[
                "Not Attempted",
                "Fail",
                "Borderline",
                "Pass",
                "Strong Pass",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </>
      )}
      <button type="submit" className="button primary">
        <Save size={16} />
        Save progress
      </button>
      <p role="status" className="form-message">
        {message}
      </p>
    </form>
  );
}
