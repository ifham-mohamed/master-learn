"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  NotebookPen,
  Search,
} from "lucide-react";
import { learningLogPath, taskGuidePath } from "@/lib/learning-types";
import { statuses } from "@/lib/progress";
import {
  categories,
  isComplete,
  slug,
  trackDescriptions,
  type Task,
} from "@/lib/tracker";
import {
  checkpointHref,
  nextWarehouseTask,
  warehouseBrief,
  warehouseCheckpoints,
  warehousePhases,
  warehouseSearch,
  warehouseTitle,
} from "@/lib/warehouse";
import { Status } from "./task-list";
import { useTracker } from "./tracker-provider";

const checkpointIds = new Set(warehouseCheckpoints.map(({ id }) => id));
const studyOrder = warehouseCheckpoints.flatMap(({ prepare, id, reflect }) => [
  ...prepare,
  id,
  ...reflect,
]);
const orderById = new Map(studyOrder.map((id, index) => [id, index]));
const defaultTrack = "Java & Spring";

function readHash() {
  return window.location.hash;
}

function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function taskStatus(task: Task) {
  return task.status === "Done" && !isComplete(task)
    ? "Needs evidence"
    : task.status;
}

function documentHref(task: Task, path: string) {
  return `/tasks/${task.id}?file=${encodeURIComponent(path)}#learning-files`;
}

function countCompleted(tasks: Task[]) {
  return tasks.filter(isComplete).length;
}

function phaseLabel(start: number, end: number) {
  return `Weeks ${start}–${end}`;
}

function RoadmapTask({
  task,
  open,
  toggle,
}: {
  task: Task;
  open: boolean;
  toggle: () => void;
}) {
  const brief = warehouseBrief(task.id);
  const checkpoint = checkpointIds.has(task.id);
  const previewId = `roadmap-preview-${task.id}`;
  const details = [
    ["Concepts to study", brief?.focus || task.section],
    ["Apply it to the project", brief?.build],
    ["Check your work", brief?.verify],
  ];

  return (
    <li className="roadmap-task" id={`roadmap-task-${task.id}`}>
      <span
        className="roadmap-node"
        data-complete={isComplete(task)}
        data-checkpoint={checkpoint}
        aria-hidden="true"
      >
        {isComplete(task) && <Check size={12} strokeWidth={3} />}
      </span>
      <div className="roadmap-task-record" data-open={open}>
        <button
          type="button"
          className="roadmap-task-trigger"
          aria-expanded={open}
          aria-controls={previewId}
          onClick={toggle}
        >
          <span className="roadmap-task-name">
            <span className="roadmap-task-meta">
              <strong>{task.id}</strong>
              <span>{checkpoint ? "Build checkpoint" : task.category}</span>
              {task.scope === "Optional" && <span>Optional</span>}
            </span>
            <span className="roadmap-task-title">{warehouseTitle(task)}</span>
          </span>
          <Status value={taskStatus(task)} />
          <ChevronDown
            size={17}
            aria-hidden="true"
            className="roadmap-chevron"
          />
        </button>
        <div id={previewId} className="roadmap-task-preview" hidden={!open}>
          {open && (
            <>
              <dl className="roadmap-task-brief">
                {details.map(
                  ([label, value]) =>
                    value && (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ),
                )}
              </dl>
              {!!brief?.requires.length && (
                <div className="roadmap-prerequisites">
                  <strong>Prerequisites</strong>
                  {brief.requires.map((id) => (
                    <a href={`#task-${id}`} key={id}>
                      {id}
                    </a>
                  ))}
                </div>
              )}
              <div className="roadmap-task-actions">
                <Link className="button primary" href={`/tasks/${task.id}`}>
                  Open task <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  className="button secondary"
                  href={documentHref(task, taskGuidePath)}
                >
                  <BookOpen size={15} aria-hidden="true" /> Task guide
                </Link>
                <Link
                  className="button secondary"
                  href={documentHref(task, learningLogPath)}
                >
                  <NotebookPen size={15} aria-hidden="true" /> Learning log
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export function InteractiveRoadmap() {
  const { tasks } = useTracker();
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [opened, setOpened] = useState<{ hash: string; id: string | null }>();
  const sorted = useMemo(
    () =>
      [...tasks].sort(
        (left, right) =>
          (orderById.get(left.id) ?? Number.MAX_SAFE_INTEGER) -
            (orderById.get(right.id) ?? Number.MAX_SAFE_INTEGER) ||
          left.startWeek - right.startWeek,
      ),
    [tasks],
  );
  const next = nextWarehouseTask(tasks);
  const completed = countCompleted(tasks);
  const linkedTask = hash.startsWith("#task-")
    ? sorted.find((task) => task.id === hash.slice(6))
    : undefined;
  const linkedTrack = categories.find(
    (category) => hash === `#track-${slug(category)}`,
  );
  const mode = linkedTrack ? "track" : "week";
  const track = linkedTrack || defaultTrack;
  const currentWeek = linkedTask?.startWeek ?? next?.startWeek ?? 1;
  const phase =
    warehousePhases.find(({ start }) => hash === `#phase-${start}`) ??
    warehousePhases.find(
      ({ start, end }) => currentWeek >= start && currentWeek <= end,
    ) ??
    warehousePhases[0];
  const openId = opened?.hash === hash ? opened.id : linkedTask?.id;
  const terms = query.trim().split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const showingLinkedTask = !!linkedTask;
  const sections =
    mode === "week"
      ? warehousePhases.map(({ start, end, title }) => ({
          hash: `#phase-${start}`,
          title,
          detail: phaseLabel(start, end),
        }))
      : categories.map((title) => ({
          hash: `#track-${slug(title)}`,
          title,
          detail: "",
        }));
  const selected =
    mode === "week" ? `#phase-${phase.start}` : `#track-${slug(track)}`;
  const matching = sorted.filter((task) => {
    if (
      !searching &&
      mode === "week" &&
      (task.startWeek < phase.start || task.startWeek > phase.end)
    )
      return false;
    if (mode === "track" && task.category !== track) return false;
    if (task.id === linkedTask?.id) return true;
    if (status && taskStatus(task) !== status) return false;
    return terms.every((term) => warehouseSearch(task, term));
  });
  const weeks = new Map<number, Task[]>();
  for (const task of matching) {
    const group = weeks.get(task.startWeek) || [];
    group.push(task);
    weeks.set(task.startWeek, group);
  }

  const linkedId = linkedTask?.id;
  useEffect(() => {
    if (linkedId)
      document
        .getElementById(`roadmap-task-${linkedId}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [linkedId]);

  function clearFilters() {
    setQuery("");
    setStatus("");
  }

  function navigate(destination: string) {
    clearFilters();
    setOpened(undefined);
    window.location.hash = destination;
  }

  return (
    <div className="roadmap-page">
      <header className="page-heading roadmap-heading">
        <div>
          <h1>Learning roadmap</h1>
          <p>
            Build Warehouse Dispatch one tested feature at a time. Follow the
            weekly path or explore a single learning track.
          </p>
        </div>
        <Link
          className="button secondary"
          href="/projects#project-requirements"
        >
          Project requirements <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </header>

      <section className="roadmap-progress" aria-label="Roadmap progress">
        <div>
          <label htmlFor="roadmap-progress-bar">
            {completed} of {tasks.length} tasks complete
          </label>
          <progress
            id="roadmap-progress-bar"
            value={completed}
            max={tasks.length}
          />
        </div>
        {next && (
          <Link href={`/tasks/${next.id}`} className="roadmap-next">
            <span>Next warehouse task</span>
            <strong>
              {next.id} · {warehouseTitle(next)}
            </strong>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        )}
      </section>

      <div className="roadmap-controls">
        <div className="roadmap-mode" role="group" aria-label="Roadmap order">
          <button
            type="button"
            aria-pressed={mode === "week"}
            onClick={() => navigate(`#phase-${phase.start}`)}
          >
            By week
          </button>
          <button
            type="button"
            aria-pressed={mode === "track"}
            onClick={() => navigate(`#track-${slug(track)}`)}
          >
            By track
          </button>
        </div>
        <div className="roadmap-search">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            aria-label={
              mode === "week" ? "Search all weeks" : `Search ${track}`
            }
            placeholder="Search topics"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select
          className="roadmap-status-filter"
          aria-label="Filter by status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">All statuses</option>
          {statuses.map((value) => (
            <option key={value}>{value}</option>
          ))}
          <option value="Needs evidence">Needs evidence</option>
        </select>
      </div>

      <div className="roadmap-layout">
        <nav
          className="roadmap-selector"
          aria-label={mode === "week" ? "Build phases" : "Learning tracks"}
        >
          <h2>{mode === "week" ? "Build phases" : "Learning tracks"}</h2>
          <ol>
            {sections.map((section) => (
              <li key={section.hash}>
                <button
                  type="button"
                  aria-current={selected === section.hash ? "true" : undefined}
                  onClick={() => navigate(section.hash)}
                >
                  <span>{section.title}</span>
                  {section.detail && <small>{section.detail}</small>}
                </button>
              </li>
            ))}
          </ol>
          <div className="roadmap-mobile-selector">
            <label htmlFor="roadmap-section">
              {mode === "week" ? "Build phase" : "Learning track"}
            </label>
            <select
              id="roadmap-section"
              value={selected}
              onChange={(event) => navigate(event.target.value)}
            >
              {sections.map((section) => (
                <option key={section.hash} value={section.hash}>
                  {section.title}
                  {section.detail && ` · ${section.detail}`}
                </option>
              ))}
            </select>
          </div>
        </nav>

        <section
          className="roadmap-journey"
          aria-labelledby="roadmap-journey-heading"
        >
          <header className="roadmap-journey-header">
            <h2 id="roadmap-journey-heading">
              {mode === "track"
                ? track
                : searching
                  ? "Search across weeks"
                  : phase.title}
            </h2>
            <p>
              {mode === "track"
                ? trackDescriptions[track]
                : searching
                  ? "Matching tasks appear in their planned study order."
                  : phase.outcome}
            </p>
            <div className="roadmap-result">
              <span role="status">
                {matching.length} {matching.length === 1 ? "task" : "tasks"} ·{" "}
                {countCompleted(matching)} complete
                {showingLinkedTask &&
                  (searching || status) &&
                  " · Linked task included"}
              </span>
              {(searching || status) && (
                <button type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>
          </header>
          {!matching.length && (
            <p className="roadmap-empty">
              No tasks match. Try another topic or status.
            </p>
          )}
          {Array.from(weeks)
            .sort(([left], [right]) => left - right)
            .map(([week, group]) => {
              const checkpoint = warehouseCheckpoints.find(
                (entry) => entry.week === week,
              );
              return (
                <section
                  className="roadmap-week"
                  key={week}
                  aria-labelledby={`roadmap-week-${week}`}
                >
                  <header>
                    <h3 id={`roadmap-week-${week}`}>Week {week}</h3>
                    {mode === "week" && checkpoint && (
                      <Link href={checkpointHref(checkpoint.id)}>
                        Project checkpoint{" "}
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    )}
                  </header>
                  <ol aria-label={`Week ${week} tasks in study order`}>
                    {group.map((task) => (
                      <RoadmapTask
                        task={task}
                        key={task.id}
                        open={openId === task.id}
                        toggle={() =>
                          setOpened({
                            hash,
                            id: openId === task.id ? null : task.id,
                          })
                        }
                      />
                    ))}
                  </ol>
                </section>
              );
            })}
        </section>
      </div>
    </div>
  );
}
