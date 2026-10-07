"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActiveStudyBar } from "./study-timer";
import { InstallApp } from "./pwa-controls";
import {
  ArrowUpRight,
  BookOpen,
  FolderOpen,
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
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  Settings2,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isComplete } from "@/lib/tracker";
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
  ["/today", "Today", Play],
  ["/reviews", "Reviews", CalendarDays],
  ["/search", "Search content", Search],
  ["/settings", "Settings & backups", Settings2],
  ["/weeks", "Weekly plan", CalendarDays],
  ["/learning", "Learning workspace", FolderOpen],
  ["/plan", "Master plan", ListTodo],
  ["/tracks", "Learning tracks", Compass],
  ["/practice", "Practice bank", Code2],
  ["/projects", "Projects", FolderKanban],
  ["/resources", "Resource library", LibraryBig],
  ["/guide", "Handbook", BookOpen],
  ["/sync", "Google Sheets sync", ArrowUpRight],
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
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
                <span className="brand-subtitle">Software engineering</span>
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
        {[
          {
            label: "Daily work",
            routes: ["/", "/today", "/weeks", "/reviews"],
          },
          {
            label: "Curriculum",
            routes: [
              "/learning",
              "/plan",
              "/tracks",
              "/practice",
              "/projects",
              "/resources",
              "/search",
            ],
          },
          { label: "Workspace", routes: ["/guide", "/sync", "/settings"] },
        ].map((group) => (
          <div className="navigation-group" key={group.label}>
            <div className="workspace-label">{group.label}</div>
            <nav aria-label={group.label}>
              {group.routes.map((route) => {
                const [url, label, Icon] = navigation.find(
                  (item) => item[0] === route,
                )!;
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
                      <Icon size={18} aria-hidden="true" />
                      <span className="nav-label">{label}</span>
                    </Link>
                  </Tooltip>
                );
              })}
            </nav>
          </div>
        ))}
        <div className="sidebar-context">
          <BookOpen size={16} aria-hidden="true" />
          <span className="nav-label">24-week learning plan</span>
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
          <ActiveStudyBar />
          <InstallApp statusOnly />
          {children}
        </main>
        <footer className="footer">
          <span>Learnspace · Software engineering</span>
          <span>Progress is saved on this device</span>
        </footer>
      </div>
    </div>
  );
}
