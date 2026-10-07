"use client";
import Link from "next/link";
import { isGitHubPages } from "@/lib/deployment";
import { useState } from "react";
import { ArrowRight, BookOpen, FolderOpen, Search } from "lucide-react";
import { categories, tasks, slug } from "@/lib/tracker";

export function LearningLibrary() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [week, setWeek] = useState("");
  const matches = tasks.filter(
    (t) =>
      (!category || t.category === category) &&
      (!week || t.startWeek === Number(week)) &&
      `${t.id} ${t.title} ${t.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Learn it. Build it. Keep the proof.</h1>
          <p>
            One folder for each task. Theory, notes, code, results, and
            references in one place.
          </p>
        </div>
        <span className="count-chip">236 task workspaces</span>
      </div>
      <div className="learning-intro">
        <div className="learning-intro-icon">
          <FolderOpen size={28} />
        </div>
        <div>
          <h2>A workspace that grows with you</h2>
          <p>
            Open a task, copy its folder path, and work in your editor. Saved
            documents appear{" "}
            {isGitHubPages
              ? "after you commit, push, and deploy to GitHub Pages"
              : "automatically in the task viewer"}
            . Run code and web projects separately, then bring the results back.
          </p>
          <Link href="/tasks/CS12">
            Explore the complete SQL JOINs example <ArrowRight size={15} />
          </Link>
          <p>
            <Link href="/guide">
              Read the application & practice handbook <BookOpen size={15} />
            </Link>
          </p>
        </div>
      </div>
      <div className="filter-bar">
        <label className="search-field">
          <Search size={18} />
          <input
            aria-label="Search learning workspaces"
            placeholder="Find a topic or task ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Learning workspace category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="Learning workspace week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        >
          <option value="">All weeks</option>
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i + 1}>
              Week {i + 1}
            </option>
          ))}
        </select>
        <button
          className="text-button"
          onClick={() => {
            setCategory("");
            setQuery("");
            setWeek("");
          }}
        >
          Clear filters
        </button>
      </div>
      <p className="result-count" aria-live="polite">
        {matches.length} task workspaces
      </p>
      <div className="learning-library-grid">
        {matches.map((t) => (
          <Link
            className="learning-task-card"
            key={t.id}
            href={`/tasks/${t.id}`}
          >
            <div className="learning-task-meta">
              <span>
                {t.id} · WEEK {t.startWeek}
              </span>
              <ArrowRight size={15} />
            </div>
            <h3>{t.title}</h3>
            <p>
              {t.category} · {t.workType}
            </p>
            <code>
              learning/{slug(t.category)}/{t.id}/
            </code>
            <span className="learning-task-foot">
              <BookOpen size={14} />
              {t.id === "CS12"
                ? "Worked example included"
                : "Theory · Notes · Code · Results · Resources"}
            </span>
          </Link>
        ))}
      </div>
      {matches.length === 0 && (
        <div className="empty-state">
          <h3>No matching workspaces</h3>
          <p>Try another task name, category, or week.</p>
        </div>
      )}
    </>
  );
}
