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

Browsing is the default. **Edit progress** enables task-only editing: status, evidence, next action, hours, confidence, completion date, and mock scores/results. Updates are stored in this browser under `learnspace-progress-v1`, without accounts or a cloud service. Editing is switched off on reload. Progress and filters persist. **Export local progress** downloads a JSON backup; reviewed backup import is available in Settings & backups. Clearing browser storage removes local updates. The original workbook is never rewritten.

## Schedule and task timers

The application plan starts **5 October 2026**. Week 1 runs **5–11 October**, and the 24-week plan ends **21 March 2027**. Planned task starts use their start week; deadlines use the last day of their end week. The original workbook, imported JSON, and historical completion dates remain unchanged. The default schedule is set in `src/lib/study.ts`; change your personal start date, capacity and study days in Settings & backups. Saving it does not update the Google spreadsheet's start-date setting or formulas.

1. Open a task and choose **Start task**. Its status becomes In progress. Only one task can hold the timer at a time, including while paused.
2. **Pause timer** saves the elapsed segment into Actual hours. **Resume task** starts another segment. **Stop & save time** releases the timer so you can start another task.
3. The estimate counts down against total actual time, including previously recorded hours. Reaching zero displays an overtime notice and keeps recording. Refreshing, closing a tab, and closing the browser do not stop the timer: pause before breaks.
4. Choose **Complete task & add evidence** to stop/save time and open the completion form. Add evidence and a completion date, then **Save progress**. Mocks still require their scores and result. Completion is never inferred from elapsed time.
5. For a missed pause or offline study, stop the timer, expand **Session history & time corrections**, enter the corrected total Actual hours, and give a reason. The correction is recorded alongside the original sessions.
6. Pause or stop before **Review changes → Sync to Google Sheets**. Saved Actual hours use the existing Master Plan column M mapping; a running segment is not synced until saved. Session history and correction reasons remain local and are included in JSON exports.

Overview shows plan dates, today's recorded study time, overdue/due-today counts, and upcoming tasks. Next task skips blocked/completed tasks and the active timer, then sorts by deadline and priority. Check prerequisites yourself before starting. Day boundaries and completion defaults use Sri Lanka time (`Asia/Colombo`). Today's study time reflects session timestamps; manual corrections change task totals but do not rewrite session history.

Timers and progress share one browser-storage record. Tabs on the same origin coordinate writes to avoid counting a session twice. Use a current browser over HTTPS or localhost. Existing browser progress is retained; different browsers/devices/origins have separate timers. Export regularly; clearing site data removes this history, and use Settings & backups to restore an exported JSON file.

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

Fonts are bundled locally. Local browsing needs no database or credentials; optional Google sync needs OAuth configuration. See [analysis](docs/ANALYSIS.md) and [validation](docs/VALIDATION.md) for the source findings and exact limits.

## Hydration and browser extensions

The reported `data-redeviation-bs-uid` attribute is absent from the app source and appears to be inserted by a browser extension before React loads. The root `<html>` uses React's `suppressHydrationWarning` to tolerate root-level attribute differences only. Descendant hydration checks remain enabled. This does not remove the extension or fix unrelated hydration problems; if other warnings appear, compare a browser session with extensions disabled and inspect the named component. See [React's hydration documentation](https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors).

## Google Sheets progress sync (local Node app)

Open **Google Sheets sync** from the sidebar, Master Plan, or a task's evidence panel. The connection now uses a persistent encrypted server session instead of a temporary browser token. No database is required. A random HttpOnly cookie identifies the session; Google access and refresh tokens stay encrypted on disk in `.local/google-sessions/` and are renewed on the server when needed.

Follow [the secure connection setup](docs/GOOGLE-SESSION-SETUP.md). Keep your existing client ID, add a server-only `GOOGLE_CLIENT_SECRET`, generate a stable `GOOGLE_SESSION_KEY` with `node scripts/setup-google-session.mjs`, and register `http://localhost:3100/api/google/callback` as an Authorized redirect URI. Set `APP_ORIGIN` to the exact origin you use. Never prefix secrets with NEXT_PUBLIC or commit `.env.local`/`.local`.

After this migration, connect once. Refreshes and browser/server restarts keep the connection for up to 30 days, unless Google expires or revokes it earlier. OAuth apps in Testing with Sheets access normally require reconnection after seven days. Disconnect removes the local session and attempts Google revocation; failures are reported. Clearing cookies or changing the encryption key requires another sign-in. Standard Sheets API use has no additional charge within [Google's quotas](https://developers.google.com/workspace/sheets/api/limits).

Save task progress, select **Review changes**, inspect before/after cells, then click **Sync to Google Sheets**. Conflicts require acknowledgement. Reviews last ten minutes; the server checks local and sheet values again before writing and verifies the result afterward. No automatic writes occur on refresh or sign-in.

The live workbook mapping is G Status, H Evidence, I Next action, M Actual hours, N Confidence, R Completed on, Z Technical score, AA Communication score, AB Mock result. Rows are found by task ID. J/S/AD/AE formulas and all other fields remain untouched. Dates use numeric spreadsheet dates; RAW input stores text literally. This remains a one-way push of locally changed fields relative to the imported curriculum. Unrelated sheet edits are not imported, and resetting to an imported value does not propose an update. Avoid concurrent editing while syncing.

Use one trusted Node.js server with persistent local disk. Multi-instance/serverless hosting requires a shared session store; public hosting also needs app-level access control and HTTPS. Protect the environment file and session folder with OS permissions. Browser progress still belongs to its origin: localhost and 127.0.0.1 remain separate stores.

## Deploy to GitHub Pages

Follow [the complete GitHub Pages guide](docs/DEPLOYMENT.md). No other hosting service or database is needed. Enable Settings → Pages → GitHub Actions, add the optional public Google client ID as an Actions variable, and run **Deploy GitHub Pages**. Pushes to main publish subsequent updates.

Use `npm run build:pages`, `npm run check:pages`, and `npm run preview:pages` to test the static site at `http://localhost:3200/master-learn/`. The export includes learning snapshots and supports repository subpaths and direct task-page refreshes. Local files appear online after committing, pushing, and deploying.

On Pages, Google sync uses a temporary browser token and reconnects after reload. The encrypted server session described above applies only to the local Node version. No secret, backend API, or private-app password is included in the static export. Published content is public; review personal learning files before deploying. Browser progress stays local to each origin and is not automatically migrated.

### Reconnecting Google on Pages

Google access now survives client-side navigation between app pages until its token expires. A full browser refresh still clears the in-memory token. The site remembers only a non-secret previously-connected marker and offers **Reconnect Google**, using Google's prompt option to avoid forcing account selection again. Google may still require account selection or consent. **Use another Google account** explicitly opens the account chooser. No access token or refresh token is stored in localStorage, sessionStorage, or the repository. Reconnection never writes spreadsheet cells; review and sync remain separate actions.


## Installed app and daily learning tools

- **Install Learnspace:** use the button above page content or in Settings. On supported Android/desktop browsers it opens the install prompt; iPhone/iPad users get Safari → Share → Add to Home Screen instructions. Published GitHub Pages builds include the manifest, PNG icons and service worker. No app store account or additional hosting is needed.
- **Offline tasks:** open a task and use Download task for offline use below its journal. The app caches its page, documents and attachments (50 MB per-task limit), plus the core app shell. A first successful online visit is required. Undownloaded pages show an offline fallback. Google sign-in and sync require internet. Browser storage eviction can remove downloads. An activated app update clears task downloads to avoid mixing versions; re-download them. Local progress is retained.
- **Today:** resume a task, see available hours from weekly capacity and selected days, and start a task whose referenced prerequisites are complete. Written prerequisites still need your judgment. This is an advisory daily budget; the app does not automatically move tasks between weeks.
- **Reviews:** compare allocated estimates, saved session hours, completed tasks, blockers and low-confidence topics for any week. Complete spaced reviews at 1, 3, 7 and 14 days after the task completion date. Historical completion dates are retained.
- **Quick journal:** add notes, questions, mistakes or reflections inside a task. Export Markdown to your task's notes folder. Browser journals are separate from the on-disk files and are included in full backups.
- **Focus mode:** enable it on a task timer. Set focus/break lengths in Settings. Prompts appear while the app is open; the task keeps counting until explicitly paused. The break countdown is temporary and resets on reload. A two-hour running reminder helps catch missed pauses. No background push-notification service is used.
- **Search content:** searches deployed theory, notes, code, results and resources and opens the matching file. Text files over 1 MB, images and PDFs are excluded from indexing. Local Node mode reads current learning files on opening Search; Pages updates the index on deployment. Search displays up to 50 matches and filters by section.
- **Sync status:** shows task records changed since the last verified sync and its timestamp. This is a local estimate; Review changes fetches exact Google cell differences and conflicts. No tokens are included in backups. Phone/computer progress is not automatically synchronized; transfer a backup when changing devices.
- **Schedule preview:** change start date, weekly hours and study days, then preview all changed deadlines before saving. Week assignments stay fixed; task starts/deadlines fall on selected days within their assigned weeks. Google schedule settings and formulas are not edited.

### Restore without losing track of your work

1. Stop any active or paused timer and export the current backup.
2. Settings & backups → Choose backup JSON. Review task, session and journal counts.
3. **Merge** keeps existing local task records and their time history, imports tasks with no local override, and merges unique journal/review entries. It keeps your current schedule. It never adds overlapping Actual hours together.
4. **Replace** uses backup task records, sessions, journals, reviews and schedule. Filters stay on this device. Imported active timers are stopped, and unsaved time since an export is not added.
5. Confirm the review and restore. A pre-restore recovery copy is saved locally; Download pre-restore recovery copy lets you restore it through the same workflow. Keep external exports because clearing browser storage also removes this recovery copy.

### Performance choices

The handbook is loaded separately, content search is fetched only on its page (also downloaded by the offline shell), static learning requests use browser caching, and task data is memoized. All visible timer displays share one clock; hidden pages stop rendering clock ticks and catch up from timestamps on return. Service-worker caches are versioned, with an explicit update action. These changes reduce repeated work; actual load speed still depends on device and connection. No production speed percentage is claimed.
