import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, slug, trackDescriptions } from "@/lib/tracker";

export const metadata: Metadata = {
  title: "Page directory",
  robots: { index: false, follow: false },
};

const groups = [
  {
    title: "Daily study",
    pages: [
      ["/", "Overview", "See your current task, upcoming deadlines, and overall progress."],
      ["/today", "Today", "Pick a ready task and manage your study session."],
      ["/reviews", "Reviews", "Revisit completed work and record what you can recall."],
      ["/weeks", "Weekly plan", "Browse each week’s workload, tasks, and checkpoint."],
    ],
  },
  {
    title: "Curriculum and project",
    pages: [
      ["/roadmap", "Roadmap", "Follow the build sequence by week or explore an ordered track."],
      ["/projects", "Projects", "Read the Warehouse Dispatch requirements, checkpoints, and architecture labs."],
      ["/plan", "Master plan", "Filter all tasks and open their guides, evidence, and progress forms."],
      ["/tracks", "Learning tracks", "Browse the curriculum by subject."],
      ["/practice", "Practice bank", "Find coding drills, interview questions, and review prompts."],
      ["/resources", "Resource library", "Find curriculum references and official learning guides."],
    ],
  },
  {
    title: "Workspace and support",
    pages: [
      ["/learning", "Learning workspace", "Find the guides, logs, code, and results stored with each task."],
      ["/search", "Search content", "Search across published task documents and learning notes."],
      ["/guide", "Handbook", "Learn how to work through a task and publish a short Markdown log."],
      ["/settings", "Settings & backups", "Manage your schedule, study preferences, and progress backups."],
      ["/sync", "Google Sheets sync", "Review and sync supported progress changes to your spreadsheet."],
      ["/offline", "Offline help", "See what stays available when your device loses its connection."],
    ],
  },
  {
    title: "Individual tracks",
    pages: categories.map((category) => [
      `/tracks/${slug(category)}`,
      category,
      trackDescriptions[category],
    ]),
  },
];

export default function PageDirectory() {
  return (
    <>
      <header className="page-heading">
        <div>
          <h1>Page directory</h1>
          <p>Find the study, project, and workspace pages in Learnspace.</p>
        </div>
      </header>
      <nav aria-label="Page directory">
        {groups.map(({ title, pages }) => (
          <section className="panel tool-card" key={title}>
            <h2>{title}</h2>
            {pages.map(([href, name, description]) => (
              <div className="tool-row" key={href}>
                <div>
                  <Link href={href}>{name} <ArrowRight size={14} aria-hidden="true" /></Link>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </section>
        ))}
      </nav>
    </>
  );
}
