"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { isGitHubPages, assetUrl } from "@/lib/deployment";
import remarkGfm from "remark-gfm";
import { ArrowRight, BookOpen, Search } from "lucide-react";

const chapters = [
  {
    id: "start",
    title: "1. Start your first learning session",
    summary: "Start the shipment CLI and save the evidence for one behavior.",
    body: `
1. Open [Today](/today) for the next ready step or [Projects](/projects#build-roadmap) for the ordered Warehouse Dispatch checkpoints.
2. Open [JA05](/tasks/JA05) for the first terminal exercise. Read **Review and learn**, **Do the work**, and **Pass check** in **Your practice**. Check the prerequisites on the task page.
3. Create your own first Java file in \`projects/warehouse-dispatch/\`. Use the task workspace for isolated experiments, notes and results.
4. Recall the concepts, predict one failure, and write the smallest working behavior yourself. Run the normal and invalid-input cases before moving on.
5. Use **Learning log** to write what you learned, what you tried and observed, and your next step. Use **Copy to evidence draft** to reuse the entry when recording progress.
6. Choose **Start task** when you begin, and **Pause timer** for breaks. **Complete task & add evidence** saves time and opens your completion form. Add evidence, confidence, and next action, then save. Mark Done only when the task outcome is demonstrated.

**On mobile:** Use Install Learnspace above the page, or Safari → Share → Add to Home Screen on iPhone/iPad. Download a task for offline use below its learning log. Reconnect for Google sync. App updates clear downloaded lessons; local progress remains. Export backups regularly.

**Daily tools:** Today recommends ready tasks. Reviews tracks weekly learning and spaced recall. Export browser log entries as Markdown when you want to keep them in the task folder. Optional Focus mode prompts you to take a break while the app is open.

**Alongside Java:** [CS12](/tasks/CS12) has a warehouse JOIN exercise and an archived SQLite worked example. Record your own results separately.
`,
  },
  {
    id: "navigation",
    title: "2. Find your way around the application",
    summary: "Know which page to use for each part of your learning.",
    body: `
| Page | Use it for |
| --- | --- |
| Overview | See your selected week, recorded progress, workload, and focus areas. |
| Today | Resume your timer, check available hours and start tasks with completed prerequisites. |
| Reviews | Compare weekly estimates and sessions; record revisions due 1, 3, 7 and 14 days after completion. |
| Search content | Find words inside theory, notes, code, results and resources. |
| Settings & backups | Install the app, preview schedule changes, export and restore reviewed backups. |
| Weekly journey | Choose one of the 24 weeks and open its tasks. |
| Learning workspace | Find your task folders by topic, task ID, category, or week. |
| Master plan | Search the curriculum and filter tasks by category and status. |
| Learning tracks | Work through related tasks within a subject. |
| Practice bank | Read the imported practice patterns and questions. Counts are workbook snapshots. |
| Projects | Read warehouse requirements, open ordered checkpoints and find advanced architecture labs. |
| Resource library | Open original references and additional official guides. Availability checks do not verify every source claim. |
| Handbook | Read the current workflow. Expand the archived workbook guidance for source context. |

Collapse the sidebar using its panel button. In compact mode, hover over the graduation logo or focus it with Tab to reveal the expand button. Navigation icons show tooltips. On mobile, open the menu; Escape or the backdrop closes it.

The moon/sun button switches themes and remembers your choice in this browser. The first visit follows your system preference. The reveal animation respects reduced-motion preferences.
`,
  },
  {
    id: "folders",
    title: "3. Understand your learning folders",
    summary:
      "A consistent home for theory, notes, source code, output, and references.",
    body: `
Every curriculum task has its own folder. For example:

\`\`\`text
learning/
  cs-and-sql/
    CS12/
      README.md
      notes/journal.md
\`\`\`

| Section | What you should save |
| --- | --- |
| README.md | Read the task order, concepts, exercise, checks, and references. |
| notes/journal.md | Add one short entry per session. |
| Optional code/ or results/ | Create these when you have an isolated experiment or a result file to keep. |

Use \`notes/journal.md\` as your single session log. Edit it in your editor or export entries from the browser and append them to the file. Open **Task files → Guide & log** to read the guide or log. Additional file sections appear as you add files.

Edit the existing templates or add new files. Templates are prompts, not complete lessons. Run \`npm run learning:init\` from the repository root to recreate missing templates; existing files are never overwritten. Use the folder paths shown in the app and keep task IDs stable. A new arbitrary folder is not a new curriculum task.
`,
  },
  {
    id: "routine",
    title: "4. Follow a repeatable practice routine",
    summary:
      "Move from understanding to evidence, with a useful record of each attempt.",
    body: `
**Before coding:** Recall the concept and write the expected behavior, constraints, and approach. Use documentation and write the implementation and checks yourself.

**While coding:** Work in small steps. Save the command needed to run your example. Test a normal case and at least one meaningful boundary or failure case. When something fails, write what you expected, what actually happened, and what you changed.

**After coding:** Record the real output, explain whether it supports your prediction, and list what remains uncertain. A screenshot without an explanation is less useful than a reproducible example with a short conclusion.

Use this outline in your learning log:

\`\`\`markdown
## What I learned
Explain the idea in your own words.
## What I tried and what happened
Record a command, observed result, or link to an artifact.
## Next step
Choose one thing to try or review.
\`\`\`

Adapt the evidence to the subject: SQL result rows and NULL cases; DSA invariants and complexity; Java behavior and failure handling; UI keyboard interaction and screen sizes; system-design assumptions and tradeoffs; mock-interview scores and reflection. Revisit weak areas instead of treating file creation as mastery.
`,
  },
  {
    id: "run-code",
    title: "5. Run code and web projects",
    summary:
      "Use your editor or terminal to execute code; use Learnspace to read and organize it.",
    body: `
Learnspace previews source files. It does **not** execute Python, Java, SQL, JSX, or TSX, install dependencies, or start your practice servers.

For the included SQL lab, install Python 3 if needed, open a terminal at the repository root, and run:

\`\`\`sh
python learning/cs-and-sql/CS12/code/run_example.py
\`\`\`

This uses Python's standard-library SQLite support and an in-memory database. It checks five query results and replaces only the example's \`results/evidence.md\` and \`results/output.json\`. Keep your personal reflection in Notes. Open the task's Results tab to read the updated files.

For another language, install its required runtime and use that project's run instructions. Record the working directory as well as the command. Save terminal output into a text or Markdown result file yourself.

The warehouse project starts as plain Java. Add Spring Boot, PostgreSQL and the React client at their checkpoints. Run each from its own project directory and record the command you actually used. Run React on a different port from Learnspace. The CS12 JSX file belongs to the archived SQL demonstration.

The learning folder is excluded from Learnspace's TypeScript and lint checks. Run tests and checks for each practice project separately. Dependency and build folders such as \`node_modules\`, \`.next\`, and \`dist\` are omitted from the viewer.
`,
  },
  {
    id: "formats",
    title: "6. Add documents, images, and results",
    summary: "Choose the right format and connect related files with links.",
    body: `
| Format | What the viewer does |
| --- | --- |
| Markdown (.md, .markdown) | Formats headings, tables, lists, links, and code blocks. Show source reveals the original text. |
| JSX, TSX, JS, TS, Python, Java, SQL and supported code | Shows source with copy/download controls. Run it separately. |
| HTML | Shows a static sandboxed preview. Inline styles and embedded data images work; scripts, forms, and remote assets are blocked. |
| PNG, JPEG, GIF, WebP, AVIF | Displays the image. |
| PDF | Provides a download for your PDF reader. |
| JSON, CSV, YAML, TXT, LOG | Shows text/source. |

Link between sections using relative Markdown paths:

\`\`\`markdown
[Read my results](../results/evidence.md)
![Observed output](../results/screenshot.png)
[Open my running project](http://127.0.0.1:3200)
\`\`\`

Relative file links stay within the same task and switch to the matching file. Save images inside a section folder; remote images are omitted. SVG, executable MDX, and raw HTML inside Markdown are not rendered. A full interactive website should run separately and be linked from a document.

Text previews are limited to 1 MB, downloads to 20 MB, and each task to 500 supported files with eight levels of nested folders. Hidden files, linked folders/junctions, and generated dependency folders are excluded.
`,
  },
  {
    id: "progress",
    title: "7. Save progress and protect your work",
    summary:
      "Understand what lives in your files and what lives in your browser.",
    body: `
There are **two separate places to save work**:

- **Learning files** live on disk in \`learning/\`. Saving in your editor updates the viewer. Back them up with the project or your usual file backup.
- **Progress** lives in this browser. Turn on **Edit progress** to record task status, evidence, next action, hours, confidence, completion date, and mock scores/results. Editing is off again after a reload; saved updates remain.

A task counts as complete only with **Done status, evidence, and a completion date**. Mocks additionally need technical and communication scores and a result. A completed mock can still have a failed result; completion and readiness are different.

Use a useful evidence reference such as \`learning/cs-and-sql/CS12/results/evidence.md — five queries checked; NULL handling explained\`. Recording this reference does not independently verify the file's claims.

Use **Export local progress** at the top of this page to download a JSON backup. Open **Settings & backups** to validate a backup and preview Merge or Replace. Export your current data first; a pre-restore recovery copy is retained locally. Imported active timers are stopped. Clearing browser storage removes progress. Switching between \`localhost\`, \`127.0.0.1\`, or ports such as 3000 and 3100 creates a separate browser store, so keep using one address for daily work.

**Your schedule:** Settings & backups lets you preview a different start date, capacity and study days. By default, the plan starts **5 October 2026**. Week 1 is **5–11 October**; week 24 ends **21 March 2027**. Task deadlines follow their end week. Overview shows deadlines, today's study time, and the next unblocked task ordered by deadline and priority. Check prerequisites before starting. Dates use Sri Lanka time.

**Track your time:** Start task changes its status to In progress. Only one task can have a running or paused timer. The estimate counts down against total Actual hours, including previous entries, then shows overtime without stopping. Refreshing or closing the browser keeps the timer running: pause for breaks. Pause saves a segment; Resume starts another; Stop & save time releases the timer for another task. Changing status away from In progress also stops and saves the timer.

**Finish or correct:** Complete task & add evidence stops/saves time and prepares the completion form; you still need evidence and Save progress. To correct forgotten breaks or add offline hours, stop the timer and open Session history & time corrections. Enter the corrected total and a reason. Actual hours update automatically; original session history remains visible. Today's time counts recorded sessions, while corrections change task totals. Exports include sessions and correction reasons.

**Sync saved time:** Pause or stop before reviewing Google Sheets changes. Only saved Actual hours are sent to Master Plan; running time and session-history details are not synced. Timers are local to this browser and origin, not shared between devices.

The original workbook is never rewritten by the app. Practice-bank counts remain imported snapshots. The new app start date does not change the Google spreadsheet's start-date setting or formulas; update that setting in Sheets separately if you want its schedule aligned. If you host the app elsewhere, its learning files are readable by people who can access that server; keep private credentials out of these files.

**Optional Google Sheets connection:** Open [Google Sheets sync](/sync) to configure free Google sign-in without a database. After saving progress locally, choose Review changes, inspect the exact Master Plan fields, then click Sync to Google Sheets. This explicitly updates the linked online spreadsheet; the original local workbook stays unchanged. Only locally changed progress fields are proposed, not curriculum definitions or formulas. The setup page explains the client ID, server-only secret, encryption key, and callback URL. Once connected, refreshing keeps your encrypted connection for up to 30 days; Google may require reconnection sooner. Tokens stay on the server. Review and sync remain manual.
`,
  },
  {
    id: "codebase",
    title: "8. Know which parts of the codebase to edit",
    summary:
      "Keep practice work, application changes, and source imports in their proper places.",
    body: `
| Folder | Purpose and when to edit it |
| --- | --- |
| learning/ | Your daily theory, notes, code, results, and references. Start here for learning. |
| src/app/ | Application pages, API routes, layout, and styles. Edit when changing Learnspace itself. |
| src/components/ | Shared navigation, task viewers, progress controls, and this guide. |
| src/lib/ | Curriculum helpers, completion rules, and safe file reading. |
| src/data/ | Imported curriculum and resource data. Generated from the supplied source workflow. |
| scripts/ | Workbook import, resource checks, and learning-folder scaffolding. |
| tests/ | Application data and learning-file checks. These do not test your separate exercises. |
| sources/ | Preserved original workbook and HTML exports. Keep these as source records. |
| docs/ | Analysis, validation, and project documentation. |

To start Learnspace from the repository root:

\`\`\`sh
npm ci
npm run dev
\`\`\`

Open \`http://127.0.0.1:3000\`. Node.js 20.9 or later is required. Run \`npm ci\` when setting up or syncing dependencies, not for every study session. For a production preview, run \`npm run build\`, then \`npm start\`; stop the development server first if both would use the same port.

When changing the application itself, check your work with:

\`\`\`sh
npm test
npm run typecheck
npm run lint
npm run build
\`\`\`

To revise the curriculum, use the workbook import workflow documented in the repository README. Preserve stable task IDs, rebuild after importing, and rerun \`npm run learning:init\` for missing templates. Renaming categories or task IDs changes their expected folder paths; existing learning files are not migrated automatically.

Keep Git commits focused: one exercise or one application change, with a short description of the result. Review the changed files and keep dependency folders, secrets, and temporary output out of commits. Commit source and useful learning evidence intentionally.
`,
  },
  {
    id: "help",
    title: "9. Troubleshoot and finish a session",
    summary:
      "Resolve common problems and leave a clear next step for tomorrow.",
    body: `
**My saved file is missing:** Check the exact task path shown in the app. The file must be saved inside Theory, Notes, Code, Results, or Resources with a supported extension. Wait five seconds with the tab visible, then choose Refresh files. Check the size limits and excluded folders above.

**The workspace is unavailable:** Keep the local server running and check that the \`learning/\` directory exists. Run \`npm run learning:init\` from the repository root if templates are missing. The file viewer needs a Node.js server and disk access; a static export cannot read these folders.

**My website is blank or not interactive:** The HTML viewer is a static preview. Start the project separately and open its saved URL. Check its terminal for the actual port and errors.

**My source looks wider than the screen:** Scroll within the code block or table. The document itself continues down the page; the footer follows its final line. On mobile, scroll the section-tab strip to reach Resources.

**My progress disappeared:** Check the browser and exact host/port you used before. Progress is local to that origin. Files on disk and browser progress are separate; saved files do not restore cleared progress.

**A task still does not count as complete:** Check Done status, evidence, and completion date. For a mock, also supply both scores and a result. Hours or confidence alone do not count as completion.

Before you finish: save all files, rerun the relevant experiment or checks, record the real result, write one next action, update progress if appropriate, and back up your work. On your next visit, begin with that next action.
`,
  },
];

export function ApplicationGuide() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("guide-start");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".handbook-chapter, #original-guidance",
          ),
        );
        const current =
          sections
            .filter((section) => section.getBoundingClientRect().top <= 160)
            .at(-1) || sections[0];
        if (current) setActive(current.id);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("resize", update);
    };
  }, [query]);
  const matches = chapters.filter((chapter) =>
    `${chapter.title} ${chapter.summary} ${isGitHubPages ? chapter.body.replace(/The setup page explains the client ID[\s\S]*?Review and sync remain manual\./, "On GitHub Pages, only the public client ID is used. Sign in again after reload; tokens remain in memory. Review and sync remain manual.") : chapter.body}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <section className="app-handbook" aria-label="Application handbook">
      <div className="handbook-welcome">
        <BookOpen size={30} />
        <div>
          <h2>Your guide from first session to finished work</h2>
          <p>
            Read the steps in order, or search for the part you need. This
            handbook explains the application; the original curriculum guidance
            follows below.
          </p>
          <Link className="button secondary" href="/projects#build-roadmap">
            Open the warehouse build order <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      {isGitHubPages && (
        <p className="inline-notice">
          GitHub Pages edition: instructions about live editor refresh apply
          only to local development. Publish saved files by committing and
          pushing to GitHub; wait for the Pages deployment. Google sync uses a
          temporary browser connection. This site has no private-app password.
        </p>
      )}
      <div className="handbook-layout">
        <aside className="handbook-index">
          <label className="handbook-search">
            <Search size={16} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this handbook…"
              aria-label="Search application guidance"
            />
          </label>
          <nav aria-label="Handbook chapters">
            {matches.map((chapter) => (
              <a
                href={`#guide-${chapter.id}`}
                key={chapter.id}
                aria-current={
                  active === `guide-${chapter.id}` ? "location" : undefined
                }
                onClick={() => setActive(`guide-${chapter.id}`)}
              >
                {chapter.title}
              </a>
            ))}
            <a
              href="#original-guidance"
              aria-current={
                active === "original-guidance" ? "location" : undefined
              }
              onClick={() => setActive("original-guidance")}
            >
              Original workbook guidance
            </a>
          </nav>
          <p role="status">
            {matches.length} of {chapters.length} chapters
          </p>
          {query && (
            <button className="button secondary" onClick={() => setQuery("")}>
              Clear search
            </button>
          )}
        </aside>
        <div className="handbook-chapters">
          {matches.map((chapter) => (
            <article
              className="handbook-chapter"
              id={`guide-${chapter.id}`}
              key={chapter.id}
            >
              <header>
                <h2>{chapter.title}</h2>
                <p>{chapter.summary}</p>
              </header>
              <div className="learning-prose">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={
                          href?.startsWith("/") && !href.startsWith("//")
                            ? assetUrl(href)
                            : href
                        }
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {isGitHubPages
                    ? chapter.body.replace(
                        /The setup page explains the client ID[\s\S]*?Review and sync remain manual\./,
                        "On GitHub Pages, only the public client ID is used. Sign in again after reload; tokens remain in memory. Review and sync remain manual.",
                      )
                    : chapter.body}
                </ReactMarkdown>
              </div>
              <a className="handbook-back" href="#handbook-top">
                Back to handbook top ↑
              </a>
            </article>
          ))}
          {matches.length === 0 && (
            <div className="empty-state">
              <h3>No matching chapters</h3>
              <p>Try “code”, “progress”, “folder”, or “results”.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
