"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, BookOpen, Search } from "lucide-react";

const chapters = [
  {
    id: "start",
    title: "1. Start your first learning session",
    summary: "Choose a task, open its folder, and make one small experiment.",
    body: `
1. Open **Weekly journey** and choose your current week. Use **Master plan** for task search and status filters, or **Learning tracks** to focus on a category.
2. Open a task. Read **What good looks like**, its practice prompt, and prerequisites before starting.
3. In **Your task workspace**, copy the folder path. Open that folder inside your project editor. The path is relative to the repository root, for example \`learning/cs-and-sql/CS12/\`.
4. Start with **Theory**, then write a prediction in **Notes**. Create and run a small experiment in **Code**.
5. Save the actual output and your explanation in **Results**. Return to the app: changes appear within five seconds while the task is visible. Use **Refresh files** if needed.
6. Turn on **Edit progress** to record your evidence, time, confidence, and next action. Mark Done only when the task outcome is demonstrated.

**Try it first:** [Open the complete CS12 JOINs example](/tasks/CS12). Its sample results demonstrate the workflow; they do not mean you have completed the task.
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
| Weekly journey | Choose one of the 24 weeks and open its tasks. |
| Learning workspace | Find your task folders by topic, task ID, category, or week. |
| Master plan | Search the curriculum and filter tasks by category and status. |
| Learning tracks | Work through related tasks within a subject. |
| Practice bank | Read the imported practice patterns and questions. Counts are workbook snapshots. |
| Projects | Understand the project profiles and connected capstone. |
| Resource library | Open original references and additional official guides. Availability checks do not verify every source claim. |
| Plan & guidance | Read this application handbook and the original workbook advice below it. |

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
      theory/concepts.md
      notes/journal.md
      code/
      results/evidence.md
      resources/links.md
\`\`\`

| Section | What you should save |
| --- | --- |
| Theory | Definitions, explanations in your own words, assumptions, diagrams, and examples. |
| Notes | Predictions, questions, mistakes, debugging steps, and reflections. |
| Code | Source files, small experiments, tests, and instructions to run your work. |
| Results | Actual output, screenshots, test reports, conclusions, and links to running projects. |
| Resources | Useful links, why they helped, and commands/ports for separately running projects. |

The task README explains the outcome and links to its sections. The app lists supported files inside the **five section folders**, not the task README itself. Nested folders work, so you can keep multiple attempts such as \`code/attempt-01/\` and \`results/attempt-01/\`.

Edit the existing templates or add new files. Templates are prompts, not complete lessons. Run \`npm run learning:init\` from the repository root to recreate missing templates; existing files are never overwritten. Use the folder paths shown in the app and keep task IDs stable. A new arbitrary folder is not a new curriculum task.
`,
  },
  {
    id: "routine",
    title: "4. Follow a repeatable practice routine",
    summary:
      "Move from understanding to evidence, with a useful record of each attempt.",
    body: `
**Before coding:** Write the problem, inputs, expected output, constraints, and your approach. Explain the concept without copying a tutorial. If a task has an AI-free practice mode, attempt it independently first and follow the task's policy.

**While coding:** Work in small steps. Save the command needed to run your example. Test a normal case and at least one meaningful boundary or failure case. When something fails, write what you expected, what actually happened, and what you changed.

**After coding:** Record the real output, explain whether it supports your prediction, and list what remains uncertain. A screenshot without an explanation is less useful than a reproducible example with a short conclusion.

Use this outline in your results document:

\`\`\`markdown
# Experiment: describe the question
## Prediction
What do I expect, and why?
## Run
Working folder, tool versions, command, and input.
## Actual result
Paste the actual output or link a saved screenshot.
## Checks
Which cases passed or failed?
## Explanation
What does the result tell me? What are its limits?
## Next action
What will I try or review next?
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

For a React/Next.js exercise, keep a separate project, for example \`learning/typescript-and-ui/TS05/code/demo/\`. Open a terminal **inside that project's folder** and run its own install/start commands. Use a different port from Learnspace. If the practice project is a Next.js app with a standard dev script, an example is:

\`\`\`sh
npm run dev -- --port 3200
\`\`\`

Then put a link such as \`[Open my practice app](http://127.0.0.1:3200)\` in Results, along with how to start it. The link works only while that project is running. The included \`CustomerOrders.jsx\` is an illustrative component to copy into a separate React app, not a standalone runnable project.

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

Use **Export local progress** at the top of this page to download a JSON backup. Backup import is not implemented. Clearing browser storage removes progress. Switching between \`localhost\`, \`127.0.0.1\`, or ports such as 3000 and 3100 creates a separate browser store, so keep using one address for daily work.

The original workbook is never rewritten by the app. Practice-bank counts and schedule settings remain imported snapshots. If you host the app elsewhere, its learning files are readable by people who can access that server; keep private credentials out of these files.
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
  const matches = chapters.filter((chapter) =>
    `${chapter.title} ${chapter.summary} ${chapter.body}`
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
          <Link className="button secondary" href="/tasks/CS12">
            Try the worked example <ArrowRight size={15} />
          </Link>
        </div>
      </div>
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
              <a href={`#guide-${chapter.id}`} key={chapter.id}>
                {chapter.title}
              </a>
            ))}
            <a href="#original-guidance">Original workbook guidance</a>
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
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {chapter.body}
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
