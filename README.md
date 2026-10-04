# Learnspace

A Next.js learning workspace built from the supplied **Final Tracker** workbook and HTML exports. Explore the 24-week journey, 236 tasks, 11 learning tracks, 74 practice entries, five project profiles, and 38 resources in a light green-and-blue interface.

## Run locally

Requires Node.js 20.9 or later (Node 24 was used for validation).

```sh
npm ci
npm run dev
```

Open [the local workspace](http://localhost:3000). For a production build, run `npm run build`, then `npm start`.

## How to use it

Open **Plan & guidance** for the searchable in-app application handbook. Its nine chapters cover first-session setup, navigation, task folders, a practice routine, running code and separate web projects, file formats, progress backups, the application codebase, and troubleshooting. The handbook is also linked from the learning library and every task workspace. Original workbook guidance remains below it.

Use the moon/sun button in the header to switch between pastel light and dark themes. Your choice is remembered on this browser; on first visit the app follows your system preference. The theme reveals outward from the button when browser support is available. Reduced-motion preferences and older browsers receive an immediate change. The graduation-cap favicon matches the workspace identity.

Long learning documents stay in the normal page flow, with the learning-loop footer below their final line. Wide code blocks and tables scroll horizontally inside their own area. On small screens the file list moves above the document and the section tabs scroll horizontally; content is never cut off by a fixed document height.

Use the panel button beside the Learnspace logo to collapse the desktop navigation. In compact mode the button tucks into the graduation logo; hover over the logo or reach it with Tab to reveal the expand control. The logo and button share one position, leaving Overview unobstructed. Compact mode shows labeled tooltips on hover and keyboard focus and is remembered on this device. On mobile, the menu opens a full drawer; Escape or the backdrop closes it and returns focus to the menu button.

- **Overview** connects the selected week, recorded progress, workload, and learning tracks.
- **Weekly journey** lets you explore all 24 weeks. The selected week is remembered on this device.
- **Master plan** supports search, category filters, and status filters. Open any task for its full deliverable, practice prompt, prerequisites, original references, and suggested guides.
- **Practice bank** contains expandable patterns and questions; practice counts remain the supplied workbook snapshot.
- **Projects** explains the five project profiles as one connected capstone with optional extensions.
- **Resource library** keeps original notes separate from newly added official learning guides. HTTP availability was checked on 4 October 2026; this does not verify all inherited claims.
- **Plan & guidance** preserves the original workflow notes, strategy, gap review, and interview checklist.

Browsing is the default. **Edit progress** enables task-only editing: status, evidence, next action, hours, confidence, completion date, and mock scores/results. Updates are stored in this browser under `learnspace-progress-v1`, without accounts or a cloud service. Editing is switched off on reload. Progress and filters persist. **Export local progress** downloads a JSON backup; automatic backup restoration is not implemented. Clearing browser storage removes local updates. The original workbook is never rewritten.

## Learn through your own files

Open **Learning workspace** in the sidebar, filter by category or week, and choose a task. Every task has five tabs: Theory, Notes, Code, Results, and Resources. Edit the corresponding files in your editor; the open task checks for changes every five seconds while the page is visible, and when you return to it. **Refresh files** also reloads the selected document. Added, changed, and removed files appear without rebuilding the app.

```text
learning/
  cs-and-sql/
    CS12/
      README.md                  Task outcome and original context
      theory/concepts.md         Understand and explain the concepts
      notes/journal.md           Predictions, questions, and reflections
      code/                      Source files and experiments
      results/evidence.md        Commands, actual output, and conclusions
      resources/links.md         Original references and further reading
```

This structure is scaffolded for all 236 tasks across 11 categories. Templates contain task-specific outcomes and category-specific questions; they are starting points, not completed lessons. Run `npm run learning:init` to create missing templates after an import. It never overwrites existing files. Folder names follow category slugs and stable workbook task IDs; arbitrary new task IDs must first be added to the curriculum.

1. Read the task outcome, then explain the theory in your own words.
2. Write your prediction or approach in Notes.
3. Save code under Code and run it with the appropriate tools in your editor or terminal.
4. Save actual output, screenshots, a report, or a project URL under Results.
5. Record what changed in your understanding and the sources you used.
6. Enable **Edit progress** when ready and record evidence and completion separately. Saving files never automatically marks learning complete.

| Saved content | How it appears |
| --- | --- |
| `.md`, `.markdown` | Formatted Markdown with tables, code blocks, and links; source toggle |
| JSX, TSX, JavaScript, TypeScript, Python, Java, SQL and other supported code | Readable source; copy and download controls |
| `.html`, `.htm` | Sandboxed static preview; inline CSS and embedded data images work; scripts, forms, network assets, and navigation are blocked |
| PNG, JPEG, GIF, WebP, AVIF | Image preview |
| PDF | Download to your PDF reader |
| JSON, CSV, YAML, TXT, LOG | Text/source preview |
| Website or running project URL in Markdown | External link opened in a separate tab |

Relative Markdown links such as `[Results](../results/evidence.md)` open the matching file in this task. Local Markdown image paths work too; save assets in one of the five sections. Remote images, embedded raw HTML in Markdown, executable MDX, SVG, and unsupported file formats are not rendered. Nested folders are supported. JSX is displayed as source: start your separate React/Next.js project on another port and put its URL in a results document.

**Start with the complete example:** [CS12 JOINs in the app](http://localhost:3000/tasks/CS12), or [read its theory](learning/cs-and-sql/CS12/theory/01-worked-example.md). It includes SQL, an illustrative JSX component, a static HTML result, notes, and executed assertions. Run `python learning/cs-and-sql/CS12/code/run_example.py` using Python 3. It creates a temporary in-memory SQLite database and rewrites only the example's `results/evidence.md` and `results/output.json`. Store personal notes separately.

The content endpoint is read-only and restricted to known task folders. Hidden files, symbolic links/junctions, dependencies, build output, and virtual environments are excluded. Preview limits are 1 MB for text, 20 MB for downloads, 500 files per task, and eight levels of nested folders. Keep credentials out of learning files. Files are visible to anyone who can access the app; the default local server binds to this computer. Deployment requires a Node.js server and the `learning/` directory on disk; a static export cannot provide this feature. Browser progress and project files are separate stores: back up both.

## Application folders

```text
sources/                     Untouched input files
  Final Tracker.xlsx         Authoritative workbook
  html/                      All 16 HTML exports and their resources/
src/
  app/                       Next.js routes, layout, and design system styles
    [view]/                  Weekly plan, master plan, practice, projects, resources, guide
    tasks/[id]/              Individual task pages
    tracks/[slug]/           Category views
    learning/                Searchable learning workspace library
    api/learning/[id]/        Read-only live file listing and previews
  components/                Navigation, views, task details, local state, shared components
  data/                      Normalized curriculum and resource availability results
  lib/                       Data types, completion rules, validation, formatting
scripts/                     Reproducible workbook import and resource checking
learning/                    Editable learning files, grouped by category and task
tests/                       Data integrity and progress rule tests
docs/
  ANALYSIS.md                Complete source inventory and interpretation
  source-audit.json          File hashes and category reconciliation
  workbook-archive.json      Full cached values and formulas for every worksheet
  VALIDATION.md              Verification results and known limits
```

## Updating the source data

Python 3 with `openpyxl` is needed only for importing, not for running the website.

```sh
python -m pip install -r scripts/requirements.txt
python scripts/import_tracker.py
python scripts/check_resources.py
```

Importing reads every worksheet, keeps all original fields, extracts the master data, records every source file's SHA-256 hash, and reconciles the category export task IDs with the master plan. Rebuild the website after importing. The HTML exports are preserved snapshots and are not regenerated. Browser progress stays attached to task IDs; retain stable IDs when revising the workbook.

## Quality checks

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

Fonts are bundled locally. The app does not need a database, credentials, or third-party font requests. See [analysis](docs/ANALYSIS.md) and [validation](docs/VALIDATION.md) for the source findings and exact limits.

## Hydration and browser extensions

The reported `data-redeviation-bs-uid` attribute is absent from the app source and appears to be inserted by a browser extension before React loads. The root `<html>` uses React's `suppressHydrationWarning` to tolerate root-level attribute differences only. Descendant hydration checks remain enabled. This does not remove the extension or fix unrelated hydration problems; if other warnings appear, compare a browser session with extensions disabled and inspect the named component. See [React's hydration documentation](https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors).

## Google Sheets progress sync

Open **Google Sheets sync** from the sidebar, Master Plan, or a task's evidence panel. This optional connection uses Google sign-in and the Sheets API without a database or service-account key. Standard API use has no additional charge, subject to [Google's quotas](https://developers.google.com/workspace/sheets/api/limits).

1. Create/select a Google Cloud project and enable the Sheets API.
2. Configure Google Auth Platform branding/audience; add your account as a test user in Testing mode.
3. Create a Web application OAuth client and register your exact JavaScript origins, such as `http://localhost:3000` and `http://localhost:3100`. Follow [Google's token-model setup](https://developers.google.com/identity/oauth2/web/guides/use-token-model).
4. Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to the public client ID, and restart development or rebuild/restart production. No client secret is used.
5. Save task progress locally, sign in on `/sync`, choose **Review changes**, inspect every proposed cell, then click **Sync to Google Sheets**. Conflicts require acknowledgement in the review UI.

The live workbook mapping was checked on 5 October 2026: G Status, H Evidence, I Next action, M Actual hours, N Confidence, R Completed on, Z Technical score, AA Communication score, AB Mock result. Rows are found by task ID. J/S/AD/AE formulas and other fields remain untouched. Dates are numeric spreadsheet dates. RAW input stores text literally, including a leading equals sign.

Only locally changed fields relative to the imported curriculum are proposed. This is not two-way synchronization: unrelated sheet edits are not imported, and resetting a field to its imported value does not propose a change. Avoid concurrent sheet editing: the sheet is rechecked before the write, but those are separate requests. Writes are followed by verification. Tokens stay in memory until reload or disconnect; disconnect revokes the grant. Local progress remains saved after syncing. Google requests spreadsheet access; application requests target only the linked Final Tracker workbook.

No OAuth client is bundled. Actual sign-in and live writes require your configured client and consent. Keep using the same origin: localhost and 127.0.0.1 have separate browser progress stores.

