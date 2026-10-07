"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { addDays } from "@/lib/planner";
const ApplicationGuide = dynamic(
  () => import("./application-guide").then((m) => m.ApplicationGuide),
  { loading: () => <p>Opening handbook…</p> },
);
import { LearningOverview } from "./learning-overview";
import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Layers3,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  categories,
  formatDate,
  isComplete,
  safeUrl,
  slug,
  sources,
  tracker,
  trackDescriptions,
  type Task,
} from "@/lib/tracker";
import additions from "@/data/additional-resources.json";
import checks from "@/data/resource-checks.json";
import { useTracker } from "./tracker-provider";
import { TaskList } from "./task-list";
import { ResourceLinks } from "./resource-links";

const trackOrder = [
  "Java & Spring",
  "TypeScript & UI",
  "CS & SQL",
  "DSA",
  "Engineering",
  "AI Engineering",
  "System design",
  "Projects",
  "Mock interviews",
  "Review",
  "Career",
];
function Heading({
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
function TrackCard({ category, tasks }: { category: string; tasks: Task[] }) {
  const items = tasks.filter((t) => t.category === category);
  const complete = items.filter(isComplete).length;
  return (
    <Link href={`/tracks/${slug(category)}`} className="track-card">
      <ArrowUpRight size={17} />
      <h3>{category}</h3>
      <p>{trackDescriptions[category]}</p>
      <div className="track-card-bottom">
        <span>{items.length} tasks</span>
        <span>
          {complete}/{items.length} complete
        </span>
      </div>
    </Link>
  );
}

export function Workspace({
  view,
  category = "",
}: {
  view: string;
  category?: string;
}) {
  const {
    tasks,
    preferences,
    setPreferences,
    exportProgress,
    localCount,
    planner,
  } = useTracker();
  const [resourceSearch, setResourceSearch] = useState("");
  const [resourceFilter, setResourceFilter] = useState("all");
  const [practiceSearch, setPracticeSearch] = useState("");
  const [practiceType, setPracticeType] = useState("");
  const { week, query, category: filterCategory, status } = preferences;
  const current = {
    ...tracker.weeks.find((w) => w.week === week)!,
    starts: addDays(planner.schedule.start, (week - 1) * 7),
    capacity: planner.schedule.capacity,
  };
  const weekTasks = tasks.filter((t) => t.startWeek === week);
  const weekComplete = weekTasks.filter(isComplete).length;
  const coreHours = weekTasks
    .filter((t) => t.scope === "Core")
    .reduce((s, t) => s + Number(t.estimate), 0);
  const weekControl = (
    <div className="week-control">
      <button
        aria-label="Previous week"
        disabled={week === 1}
        onClick={() => setPreferences({ week: week - 1 })}
      >
        <ChevronLeft size={17} />
      </button>
      <label>
        <CalendarDays size={16} />
        <select
          aria-label="Selected week"
          value={week}
          onChange={(e) => setPreferences({ week: Number(e.target.value) })}
        >
          {tracker.weeks.map((w) => (
            <option key={w.week} value={w.week}>
              Week {w.week} of 24
            </option>
          ))}
        </select>
      </label>
      <button
        aria-label="Next week"
        disabled={week === 24}
        onClick={() => setPreferences({ week: week + 1 })}
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );
  const filteredTasks = tasks.filter(
    (t) =>
      (!category || t.category === category) &&
      (category || !filterCategory || t.category === filterCategory) &&
      (!status || t.status === status) &&
      `${t.title} ${t.id} ${t.category} ${t.doneWhen} ${t.section}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  if (view === "overview") return <LearningOverview />;

  if (view === "weeks")
    return (
      <>
        <Heading
          label="ONE WEEK AT A TIME"
          title="Your weekly journey"
          description="A practical path from fundamentals to projects and interview practice."
        >
          {weekControl}
        </Heading>
        <div className="week-strip" aria-label="Choose a week">
          {tracker.weeks.map((w) => (
            <button
              key={w.week}
              className={week === w.week ? "selected" : ""}
              aria-pressed={week === w.week}
              onClick={() => setPreferences({ week: w.week })}
            >
              <small>WEEK</small>
              {String(w.week).padStart(2, "0")}
              {tasks.filter((t) => t.startWeek === w.week).some(isComplete) && (
                <span className="week-dot" />
              )}
            </button>
          ))}
        </div>
        <section className="week-feature">
          <div>
            <span className="context-label">
              WEEK {week} · {formatDate(current.starts)}
            </span>
            <h2>{current.phase}</h2>
            <p>{current.focus}</p>
          </div>
          <div className="week-feature-stats">
            <span>
              <strong>
                {weekComplete}/{weekTasks.length}
              </strong>
              tasks complete
            </span>
            <span>
              <strong>{current.dsaTarget}</strong>new DSA problems
            </span>
            <span>
              <strong>{current.mocks}</strong>mock sessions
            </span>
          </div>
        </section>
        <div
          className={`inline-notice ${coreHours > current.capacity ? "amber" : ""}`}
        >
          <Clock3 size={18} />
          <span>
            <strong>
              {coreHours}h core work / {current.capacity}h capacity.
            </strong>{" "}
            {coreHours > current.capacity
              ? "This week is over capacity. Rebalance your source schedule before adding optional work."
              : "The core work fits your planned capacity."}{" "}
            Hours are attributed to each task’s start week.
          </span>
        </div>
        <section className="panel">
          <div className="section-heading">
            <h2>This week’s tasks</h2>
            <span className="muted">{weekTasks.length} tasks</span>
          </div>
          <TaskList items={weekTasks} />
        </section>
        <section className="panel reflection">
          <h2>Weekly reflection</h2>
          <p>
            <strong>Review outcome:</strong>{" "}
            {current.outcome || "No reflection recorded in the workbook."}
          </p>
          <p>
            <strong>Next-week adjustment:</strong>{" "}
            {current.adjustment || "No adjustment recorded."}
          </p>
          <Link href="/tracks/review">
            Browse review tasks <ArrowRight size={15} />
          </Link>
        </section>
      </>
    );

  if (view === "tracks")
    return (
      <>
        <Heading
          label="YOUR CONNECTED CURRICULUM"
          title="Explore your learning tracks"
          description="Eleven areas of focus. One complete engineering skill set."
        />
        <div className="track-grid">
          {trackOrder.map((name) => (
            <TrackCard key={name} category={name} tasks={tasks} />
          ))}
        </div>
      </>
    );

  if (view === "plan" || view === "track")
    return (
      <>
        <Heading
          label={category ? "LEARNING TRACK" : "THE COMPLETE PICTURE"}
          title={category || "Your master plan"}
          description={
            category
              ? trackDescriptions[category]
              : "Every task, deliverable, and milestone, connected to its original context."
          }
        >
          <span className="count-chip">
            {category
              ? tasks.filter((t) => t.category === category).length
              : tasks.length}{" "}
            tasks
          </span>
        </Heading>
        <div className="filter-bar">
          <label className="search-field">
            <Search size={18} />
            <input
              aria-label="Search tasks"
              placeholder="Search tasks, skills, or task IDs…"
              value={query}
              onChange={(e) => setPreferences({ query: e.target.value })}
            />
          </label>
          {!category && (
            <select
              aria-label="Filter learning track"
              value={filterCategory}
              onChange={(e) => setPreferences({ category: e.target.value })}
            >
              <option value="">All tracks</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          )}
          <select
            aria-label="Filter task status"
            value={status}
            onChange={(e) => setPreferences({ status: e.target.value })}
          >
            <option value="">All statuses</option>
            {["Not started", "In progress", "Done", "Blocked"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            className="text-button"
            onClick={() =>
              setPreferences({ query: "", category: "", status: "" })
            }
          >
            Clear filters
          </button>
        </div>
        <div className="result-count" aria-live="polite">
          {filteredTasks.length} matching tasks
        </div>
        <div className="inline-notice">
          <Link href="/sync">
            Review local progress and sync the editable Master Plan fields to
            Google Sheets →
          </Link>
        </div>
        <section className="panel">
          <TaskList items={filteredTasks} />
        </section>
      </>
    );

  if (view === "practice") {
    const items = tracker.practice.filter(
      (p) =>
        (!practiceType || p.practiceType === practiceType) &&
        `${p.title} ${p.answer} ${p.category} ${p.id}`
          .toLowerCase()
          .includes(practiceSearch.toLowerCase()),
    );
    return (
      <>
        <Heading
          label="UNDERSTAND. PRACTICE. EXPLAIN."
          title="Your practice bank"
          description="20 DSA patterns and 54 questions to turn familiarity into understanding."
        />
        <div className="inline-notice">
          <Target size={20} />
          <span>
            <strong>145 distinct problems across the full plan.</strong> Pattern
            targets are cumulative through week 24. Repeat solutions are
            practice, not new problems.
          </span>
        </div>
        <div className="filter-bar">
          <label className="search-field">
            <Search size={18} />
            <input
              aria-label="Search practice"
              placeholder="Find a pattern or interview question…"
              value={practiceSearch}
              onChange={(e) => setPracticeSearch(e.target.value)}
            />
          </label>
          <select
            aria-label="Practice type"
            value={practiceType}
            onChange={(e) => setPracticeType(e.target.value)}
          >
            <option value="">All practice types</option>
            {[...new Set(tracker.practice.map((p) => p.practiceType))].map(
              (t) => (
                <option key={t}>{t}</option>
              ),
            )}
          </select>
        </div>
        <div className="result-count" aria-live="polite">
          {items.length} practice entries
        </div>
        <div className="practice-grid">
          {items.map((p) => (
            <details className="practice-card" key={p.id}>
              <summary>
                <div className="practice-card-meta">
                  <span>
                    {p.id} · {p.category}
                  </span>
                  <span>Week {p.introWeek}</span>
                </div>
                <h3>{p.title}</h3>
                <div className="practice-card-foot">
                  <span className="phase-pill">{p.practiceType}</span>
                  <span>
                    {p.target ? `${p.target} problems` : "View prompt"}{" "}
                    <ChevronRight size={14} />
                  </span>
                </div>
              </summary>
              <div className="practice-expanded">
                <h4>Pattern / strong answer</h4>
                <p className="preserve-lines">{p.answer}</p>
                <dl>
                  <dt>Practice mode</dt>
                  <dd>{p.aiMode || "Not specified"}</dd>
                  <dt>Recorded attempts / solved</dt>
                  <dd>{p.attempts}</dd>
                  <dt>Status</dt>
                  <dd>{p.status}</dd>
                  <dt>Priority / confidence</dt>
                  <dd>
                    {p.priority} · {p.confidence} / 5
                  </dd>
                  <dt>Difficulty targets</dt>
                  <dd>
                    {p.target
                      ? `${p.easy} easy · ${p.medium} medium · ${p.hard} hard`
                      : "No problem-count target for questions"}
                  </dd>
                  <dt>Timebox</dt>
                  <dd>
                    {p.timebox ? `${p.timebox} minutes` : "Not specified"}
                  </dd>
                  <dt>Last practiced / review due</dt>
                  <dd>
                    {formatDate(p.lastPracticed)} / {formatDate(p.reviewDue)}
                  </dd>
                  <dt>Review plan</dt>
                  <dd>{p.reviewPlan || "Not recorded"}</dd>
                  <dt>Next action</dt>
                  <dd>{p.nextAction || "Not recorded"}</dd>
                  <dt>Evidence</dt>
                  <dd>{p.evidence || "Not recorded"}</dd>
                  <dt>Original source</dt>
                  <dd>{p.originalRows}</dd>
                </dl>
                <ResourceLinks ids={p.sourceIds} />
              </div>
            </details>
          ))}
        </div>
        {items.length === 0 && (
          <div className="empty-state">
            <h3>No practice entries found</h3>
            <p>Try a different keyword or practice type.</p>
          </div>
        )}
      </>
    );
  }

  if (view === "projects")
    return (
      <>
        <Heading
          label="TURN KNOWLEDGE INTO EVIDENCE"
          title="One capstone. Many skills."
          description="Connect your Java backend and TypeScript interface in a product you can explain."
        />
        <div className="inline-notice">
          <Layers3 size={20} />
          <span>
            The five profiles describe a connected capstone and optional
            extensions. Existing exposure is preserved as context; it does not
            establish completion.
          </span>
        </div>
        <div className="project-profiles">
          {tracker.guide
            .filter((g) => g.type === "Project profile")
            .map((p, i) => (
              <details
                key={p.relatedIds}
                className="project-profile"
                open={i === 0}
              >
                <summary>
                  <span className={`track-icon color-${i}`}>
                    <Layers3 size={22} />
                  </span>
                  <span>
                    <span className="context-label">{p.relatedIds}</span>
                    <h3>{p.title}</h3>
                  </span>
                  <ChevronRight size={18} />
                </summary>
                <div className="project-profile-body">
                  <p className="preserve-lines">{p.guidance}</p>
                  <p className="muted">{p.verification}</p>
                </div>
              </details>
            ))}
        </div>
        <section className="panel">
          <div className="section-heading">
            <h2>Your project deliverables</h2>
            <span className="muted">30 tasks</span>
          </div>
          <TaskList items={tasks.filter((t) => t.category === "Projects")} />
        </section>
      </>
    );

  if (view === "resources") {
    const entries = [
      ...sources.map((s) => ({
        id: s.relatedIds,
        title: s.title,
        description: s.guidance,
        url: s.source,
        verification: s.verification,
        added: false,
        category: "Workbook reference",
      })),
      ...additions.map((s) => ({
        ...s,
        verification: `Official learning guide · selected ${s.checked}`,
        added: true,
      })),
    ].filter(
      (r) =>
        `${r.title} ${r.description} ${r.id} ${r.category}`
          .toLowerCase()
          .includes(resourceSearch.toLowerCase()) &&
        (resourceFilter === "all" ||
          (resourceFilter === "added" ? r.added : !r.added)),
    );
    return (
      <>
        <Heading
          label="A LIBRARY WITH CONTEXT"
          title="Good sources. Deeper understanding."
          description="Your 34 original references, plus four official guides for hands-on learning."
        />
        <div className="inline-notice">
          <ShieldCheck size={20} />
          <span>
            <strong>Links checked on 4 October 2026.</strong> Availability and
            content verification are separate. Original verification notes are
            preserved; inherited market claims have not been reverified.
          </span>
        </div>
        <div className="filter-bar">
          <label className="search-field">
            <Search size={18} />
            <input
              aria-label="Search resources"
              placeholder="Search resources, technologies, or source IDs…"
              value={resourceSearch}
              onChange={(e) => setResourceSearch(e.target.value)}
            />
          </label>
          <select
            aria-label="Resource collection"
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
          >
            <option value="all">All resources</option>
            <option value="original">Original references</option>
            <option value="added">Added learning guides</option>
          </select>
        </div>
        <div className="result-count" aria-live="polite">
          {entries.length} resources
        </div>
        <div className="resource-grid">
          {entries.map((r) => {
            const url = safeUrl(r.url);
            const check = checks.find((c) => c.id === r.id);
            const related = tasks.filter(
              (t) =>
                t.sourceIds.split(/\s+/).includes(r.id) ||
                additions.find((a) => a.id === r.id)?.taskIds.includes(t.id),
            );
            return (
              <article className="resource-card" key={r.id} id={r.id}>
                <div className="resource-top">
                  <span className={`resource-glyph ${r.added ? "added" : ""}`}>
                    <BookOpen size={19} />
                  </span>
                  <span className="small-label">
                    {r.id}
                    {r.added ? " · ADDED GUIDE" : ""}
                  </span>
                  <span className="link-health">
                    <span />
                    {check?.state || "Unchecked"}
                  </span>
                </div>
                <h3>{r.title}</h3>
                <p className="preserve-lines">{r.description}</p>
                <div className="verification">{r.verification}</div>
                {related.length > 0 && (
                  <details className="related-tasks">
                    <summary>{related.length} linked tasks</summary>
                    {related.map((t) => (
                      <Link href={`/tasks/${t.id}`} key={t.id}>
                        {t.id} · {t.title}
                      </Link>
                    ))}
                  </details>
                )}
                <div className="resource-bottom">
                  <span>
                    {url
                      ? new URL(url).hostname.replace("www.", "")
                      : "Invalid URL"}
                  </span>
                  {url && (
                    <a href={url} target="_blank" rel="noreferrer">
                      Open resource <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {entries.length === 0 && (
          <div className="empty-state">
            <h3>No matching resources</h3>
            <p>Try a topic, technology, or source ID.</p>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Heading
        label="THE CONTEXT BEHIND THE PLAN"
        title="Your application & practice handbook"
        description="Keep the purpose, original guidance, and evidence behind every task close at hand."
      >
        <button className="button secondary" onClick={exportProgress}>
          <ArrowDownToLine size={16} />
          Export local progress
        </button>
      </Heading>
      <div id="handbook-top">
        <ApplicationGuide />
      </div>
      <section className="guide-intro" id="original-guidance">
        <span className="track-icon color-0">
          <TrendingUp size={24} />
        </span>
        <div>
          <h2>Completion is evidence. Readiness is demonstrated.</h2>
          <p>
            Tasks count as complete when marked Done with evidence and a
            completion date. Mocks also need technical and communication scores
            and a result. A completed mock can still have a failed result.
          </p>
          <p>
            Start date: <strong>{formatDate(planner.schedule.start)}</strong> ·
            Review interval:{" "}
            <strong>{tracker.settings.reviewInterval} days</strong> ·{" "}
            <strong>{localCount}</strong> local task updates
          </p>
        </div>
      </section>
      <div className="inline-notice">
        <ShieldCheck size={19} />
        <span>
          Browse by default. Turn on <strong>Edit progress</strong> to record
          task progress on this device. Changes stay in this browser until you
          explicitly review and sync to Google Sheets; your local source files
          stay unchanged. Practice-bank counts and schedule settings remain
          source snapshots.
        </span>
      </div>
      <div className="guide-groups">
        {["How to use", "Gap review", "Strategy", "Project interview"].map(
          (type) => (
            <section key={type} className="panel guide-section">
              <div className="section-heading">
                <h2>{type}</h2>
                <span className="muted">
                  {tracker.guide.filter((g) => g.type === type).length} notes
                </span>
              </div>
              {tracker.guide
                .filter((g) => g.type === type)
                .map((g) => (
                  <details key={g.sourceRow}>
                    <summary>
                      {g.title}
                      <ChevronRight size={16} />
                    </summary>
                    <div>
                      <p className="preserve-lines">{g.guidance}</p>
                      <p className="muted">
                        {g.relatedIds && `Related: ${g.relatedIds} · `}
                        {g.verification}
                      </p>
                      {g.source && (
                        <small>Original reference: {g.source}</small>
                      )}
                    </div>
                  </details>
                ))}
            </section>
          ),
        )}
      </div>
    </>
  );
}
