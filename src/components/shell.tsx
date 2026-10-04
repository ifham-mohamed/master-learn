"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  FolderOpen,
  CalendarDays,
  ChevronRight,
  Code2,
  Coffee,
  Braces,
  Network,
  Compass,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  ListTodo,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { categories, slug, isComplete } from "@/lib/tracker";
import { useTracker } from "./tracker-provider";
import { Tooltip } from "./tooltip";
import { ThemeToggle } from "./theme-toggle";
import {
  expandedServerSnapshot,
  getMobileSnapshot,
  getSidebarSnapshot,
  setSidebarCollapsed,
  subscribeMobile,
  subscribeSidebar,
} from "@/lib/sidebar-preference";

const navigation = [
  ["/", "Overview", LayoutDashboard],
  ["/weeks", "Weekly journey", CalendarDays],
  ["/learning", "Learning workspace", FolderOpen],
  ["/plan", "Master plan", ListTodo],
  ["/tracks", "Learning tracks", Compass],
  ["/practice", "Practice bank", Code2],
  ["/projects", "Projects", FolderKanban],
  ["/resources", "Resource library", LibraryBig],
  ["/guide", "Plan & guidance", BookOpen],
  ["/sync", "Google Sheets sync", ArrowUpRight],
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const collapsed = useSyncExternalStore(
    subscribeSidebar,
    getSidebarSnapshot,
    expandedServerSnapshot,
  );
  const mobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    expandedServerSnapshot,
  );
  const compact = collapsed && !mobile;
  const sidebarRef = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const mobileClose = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open || !mobile) return;
    const trigger = mobileTrigger.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileClose.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === "Tab") {
        const elements = Array.from(
          sidebarRef.current?.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ) || [],
        ).filter((element) => element.offsetParent !== null);
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      trigger?.focus();
    };
  }, [open, mobile]);
  const { tasks, editing, setEditing, localCount, error } = useTracker();
  const core = tasks.filter((t) => t.scope === "Core");
  const completion = Math.round(
    (core.filter(isComplete).length / core.length) * 100,
  );
  const pageTitle =
    navigation.find(([url]) => url === pathname)?.[1] ||
    (pathname.startsWith("/tasks") ? "Task details" : "Learning tracks");
  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside
        ref={sidebarRef}
        id="workspace-navigation"
        className={`sidebar ${open ? "is-open" : ""}`}
        aria-label="Main navigation"
        role={mobile && open ? "dialog" : undefined}
        aria-modal={mobile && open ? true : undefined}
        inert={mobile && !open}
      >
        <div className="sidebar-heading">
          <Tooltip label="Learnspace overview" enabled={false}>
            <Link
              href="/"
              className="brand"
              aria-label="Learnspace overview"
              tabIndex={compact ? -1 : undefined}
              aria-hidden={compact ? true : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="brand-icon">
                <GraduationCap size={24} />
              </span>
              <span className="brand-text">
                learnspace
                <span className="brand-subtitle">LEARNING WORKSPACE</span>
              </span>
            </Link>
          </Tooltip>
          <div className="desktop-sidebar-control">
            <Tooltip
              label={collapsed ? "Expand navigation" : "Collapse navigation"}
              enabled={!mobile}
            >
              <button
                type="button"
                className="sidebar-toggle icon-button"
                aria-label={
                  collapsed ? "Expand navigation" : "Collapse navigation"
                }
                aria-expanded={!collapsed}
                aria-controls="workspace-navigation"
                onClick={() => setSidebarCollapsed(!collapsed)}
              >
                {collapsed ? (
                  <PanelLeftOpen size={18} />
                ) : (
                  <PanelLeftClose size={18} />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
        <button
          ref={mobileClose}
          className="mobile-close icon-button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>
        <div className="workspace-label">PERSONAL WORKSPACE</div>
        <nav aria-label="Workspace">
          {navigation.map(([url, label, Icon]) => {
            const active =
              pathname === url ||
              (url === "/tracks" && pathname.startsWith("/tracks/")) ||
              (url === "/plan" && pathname.startsWith("/tasks/"));
            return (
              <Tooltip key={url} label={label} enabled={compact}>
                <Link
                  href={url}
                  aria-label={label}
                  onClick={() => setOpen(false)}
                  aria-current={
                    active
                      ? pathname === url
                        ? "page"
                        : "location"
                      : undefined
                  }
                  className={`nav-link ${active ? "active" : ""}`}
                >
                  <Icon size={18} />
                  <span className="nav-label">{label}</span>
                  {url === "/weeks" && <span className="nav-count">24</span>}
                </Link>
              </Tooltip>
            );
          })}
        </nav>
        <div className="sidebar-rule" />
        <div className="workspace-label">YOUR FOCUS AREAS</div>
        <nav aria-label="Focus areas">
          {(
            [
              ["Java & Spring", Coffee],
              ["TypeScript & UI", Braces],
              ["DSA", Code2],
              ["System design", Network],
            ] as const
          ).map(([name, Icon], i) => (
            <Tooltip key={name} label={name} enabled={compact}>
              <Link
                href={`/tracks/${slug(name)}`}
                aria-label={name}
                aria-current={
                  pathname === `/tracks/${slug(name)}` ? "page" : undefined
                }
                className={`focus-link ${pathname === `/tracks/${slug(name)}` ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className={`focus-icon color-${i}`}>
                  <Icon size={17} />
                </span>
                <span className="nav-label">{name}</span>
              </Link>
            </Tooltip>
          ))}
        </nav>
        <Tooltip
          label={`All ${categories.length} learning tracks`}
          enabled={compact}
        >
          <Link
            href="/tracks"
            aria-label={`All ${categories.length} learning tracks`}
            className="all-tracks"
            onClick={() => setOpen(false)}
          >
            <span className="nav-label">
              All {categories.length} learning tracks
            </span>{" "}
            <ChevronRight size={16} />
          </Link>
        </Tooltip>
        <div className="sidebar-bottom">
          <div className="small-label">
            <Sparkles size={14} /> ONE STEP AT A TIME
          </div>
          <p>
            Small, consistent steps.
            <br />
            Stronger engineering skills.
          </p>
          <Link href="/guide" onClick={() => setOpen(false)}>
            Explore your plan <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="profile">
          <span className="avatar">SE</span>
          <span className="profile-text">
            Software engineer<small>Personal learning workspace</small>
          </span>
          <span className="online-dot" />
        </div>
      </aside>
      {open && mobile && (
        <button
          className="nav-scrim"
          tabIndex={-1}
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="main-shell" inert={open && mobile}>
        <header className="topbar">
          <div className="breadcrumb">
            <button
              ref={mobileTrigger}
              className="mobile-menu icon-button"
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="workspace-navigation"
              onClick={() => setOpen(true)}
            >
              <Menu size={21} />
            </button>
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{pageTitle}</strong>
          </div>
          <div className="topbar-right">
            <ThemeToggle />
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
