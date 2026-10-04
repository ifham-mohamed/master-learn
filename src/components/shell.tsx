"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Code2,
  Compass,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  ListTodo,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { categories, slug, isComplete } from "@/lib/tracker";
import { useTracker } from "./tracker-provider";

const navigation = [
  ["/", "Overview", LayoutDashboard],
  ["/weeks", "Weekly journey", CalendarDays],
  ["/plan", "Master plan", ListTodo],
  ["/tracks", "Learning tracks", Compass],
  ["/practice", "Practice bank", Code2],
  ["/projects", "Projects", FolderKanban],
  ["/resources", "Resource library", LibraryBig],
  ["/guide", "Plan & guidance", BookOpen],
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { tasks, editing, setEditing, localCount, error } = useTracker();
  const core = tasks.filter((t) => t.scope === "Core");
  const completion = Math.round(
    (core.filter(isComplete).length / core.length) * 100,
  );
  const pageTitle =
    navigation.find(([url]) => url === pathname)?.[1] ||
    (pathname.startsWith("/tasks") ? "Task details" : "Learning tracks");
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside
        className={`sidebar ${open ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <GraduationCap size={24} />
          </span>
          <span>
            learnspace
            <span className="brand-subtitle">YOUR ENGINEERING JOURNEY</span>
          </span>
        </Link>
        <button
          className="mobile-close icon-button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>
        <div className="workspace-label">PERSONAL WORKSPACE</div>
        <nav>
          {navigation.map(([url, label, Icon]) => (
            <Link
              key={url}
              href={url}
              onClick={() => setOpen(false)}
              aria-current={pathname === url ? "page" : undefined}
              className={`nav-link ${pathname === url ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
              {url === "/weeks" && <span className="nav-count">24</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-rule" />
        <div className="workspace-label">YOUR FOCUS AREAS</div>
        <nav>
          {["Java & Spring", "TypeScript & UI", "DSA", "System design"].map(
            (name, i) => (
              <Link
                key={name}
                href={`/tracks/${slug(name)}`}
                className="focus-link"
                onClick={() => setOpen(false)}
              >
                <span className={`dot color-${i}`} />
                {name}
              </Link>
            ),
          )}
        </nav>
        <Link
          href="/tracks"
          className="all-tracks"
          onClick={() => setOpen(false)}
        >
          All {categories.length} learning tracks <ChevronRight size={14} />
        </Link>
        <div className="sidebar-bottom">
          <div className="small-label">
            <Sparkles size={14} /> ONE STEP AT A TIME
          </div>
          <p>
            Small, consistent steps.
            <br />
            Stronger engineering skills.
          </p>
          <Link href="/guide">
            Explore your plan <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="profile">
          <span className="avatar">SE</span>
          <span>
            Software engineer<small>Personal learning workspace</small>
          </span>
          <span className="online-dot" />
        </div>
      </aside>
      {open && (
        <button
          className="nav-scrim"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="mobile-menu icon-button"
              aria-label="Open navigation"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={21} />
            </button>
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{pageTitle}</strong>
          </div>
          <div className="topbar-right">
            <span className="snapshot-pill">
              <span />
              {localCount ? "Local progress" : "Workbook snapshot"}
            </span>
            <button
              className={`edit-toggle ${editing ? "enabled" : ""}`}
              aria-pressed={editing}
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Editing · on device" : "Edit progress"}
            </button>
            <span className="topbar-progress">{completion}% core complete</span>
            <span className="avatar small">SE</span>
          </div>
        </header>
        {error && (
          <div role="alert" className="storage-error">
            {error}
          </div>
        )}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="footer">
          <span>Made for the long game.</span>
          <span>Java + TypeScript · 24 weeks · One focused journey</span>
        </footer>
      </div>
    </div>
  );
}
