# Source analysis and organization

Analysis date: 4 October 2026. Scope: every supplied file under `C:\projects\swe-learn` before implementation, excluding Git internals.

## What was supplied

There was no existing Next.js project. The input consisted of 21 files: one Excel workbook, 16 exported HTML worksheets, one stylesheet, and three generated chart scripts. These are organized under `sources/`; the HTML and its `resources/` directory retain their relative relationship. Every file is listed with its size and SHA-256 digest in `source-audit.json`.

The workbook contains 16 sheets. All cached cell values and all formulas, including array formulas, are captured in `workbook-archive.json`. The source workbook retains formatting, validation, charts, and other original workbook features. The application uses the normalized data in `src/data/tracker.json`, rather than executing the exported spreadsheet/chart scripts.

| Input                        | Meaning                                                         | Application destination                                |
| ---------------------------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| Dashboard                    | Derived summaries, workload, category/section totals            | Overview, with summaries calculated from the task data |
| Master Plan                  | Single authoritative task table, 31 columns                     | Master plan and 236 individual task pages              |
| Weekly Review                | 24 weeks, capacity, focus, DSA targets, reflections, start date | Weekly journey                                         |
| Practice Bank                | 20 DSA patterns and 54 questions, 25 columns                    | Searchable practice bank                               |
| Guide & Sources              | 88 guidance, gap, strategy, project, and source records         | Guidance, projects, and resource library               |
| 11 category sheets           | Formula-linked subsets of the master task table                 | Learning tracks backed by the same tasks               |
| HTML resources/sheet.css     | Spreadsheet export formatting                                   | Preserved with the HTML archive                        |
| Three chart JavaScript files | Generated spreadsheet chart runtime, not application source     | Preserved with the HTML archive                        |

Every category HTML export has the same task IDs in the same order as its category in the master table. The app therefore does not import category copies as additional tasks. All HTML files were parsed; their nonempty row counts and worksheet associations appear in the audit. The large generated chart libraries were inventoried and preserved as export support files, not treated as hand-written product code or subjected to a security audit.

## Curriculum and progress

| Category        |   Tasks |
| --------------- | ------: |
| Java & Spring   |      31 |
| TypeScript & UI |      29 |
| CS & SQL        |      15 |
| Engineering     |      15 |
| AI Engineering  |       7 |
| DSA             |      24 |
| System design   |      10 |
| Projects        |      30 |
| Mock interviews |      44 |
| Review          |      25 |
| Career          |       6 |
| **Total**       | **236** |

There are 226 core tasks and 10 optional tasks. The source records two Done tasks, one In progress task, and 233 Not started tasks, with 0.5 actual hours. Both Done tasks satisfy the workbook's recorded completion requirements. Their evidence is preserved verbatim; no independent assessment of the learner's skill or evidence quality was performed.

Core completion is 2/226, displayed as 1% after rounding. Confidence, hours spent, and task completion are separate. The completion rule mirrors the workbook:

1. Status must be Done.
2. Evidence and completion date must be present.
3. Mock work additionally requires technical and communication scores and a result other than Not Attempted.

A failed mock can still be complete. Neither a high confidence rating nor logged hours proves readiness. New local edits must pass these checks before being saved as Done.

## Schedule and scope findings

The supplied start date is 29 September 2026, with a seven-day review interval. Due dates are the end of each task's end week. Review dates follow recorded completion dates. Workload is attributed to the task's start week, as explicitly documented in the workbook; it is not spread automatically over multi-week tasks.

Three weeks exceed their recorded core capacity:

| Week | Core estimate | Capacity | Excess |
| ---- | ------------: | -------: | -----: |
| 1    |        16.25h |      13h |  3.25h |
| 4    |         13.5h |      13h |   0.5h |
| 5    |         15.5h |      14h |   1.5h |

The interface displays these constraints. It does not silently rewrite the learning schedule. The 24 weekly DSA targets and the 20 pattern targets both sum to 145. Pattern targets are cumulative across the plan; a pattern's introduction week is not a deadline for all its problems.

The five project profiles describe one Java/Spring backend and TypeScript client capstone with optional extensions. Existing Project ONE exposure is context rather than verified completion. Node.js, Python, and advanced AI implementation remain optional where designated in the source.

Some guidance is historical: a note says the baseline/start date remains unconfirmed, while the current workbook contains a start date and completed setup tasks. The UI retains the note as original guidance and uses the current structured values for its summaries. The guide also references an earlier `Fresher_SWE_Interview_Command_Center.xlsx` and Markdown snapshots; those files were not supplied. Their content cannot be independently reconciled against the claim that 436 older source rows were mapped. Original row references remain available for future comparison.

## Resources

All 34 original source IDs referenced by tasks resolve to guide entries. Their URLs and original verification labels are preserved. Some links provide market or hiring context rather than direct instruction—for example, JOINs links to a technology survey. They should not be presented as SQL tutorials.

The library adds four separately identified official learning guides, also linked to relevant task details:

- [Thinking in React](https://react.dev/learn/thinking-in-react): component structure and state for React tasks.
- [Next.js dashboard course](https://nextjs.org/learn/dashboard-app): routing and data integration for the client/project tasks.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro): types, narrowing, generics, and related tasks.
- [PostgreSQL getting started](https://www.postgresql.org/docs/current/tutorial-start.html): a starting point for the official SQL tutorial.

All 38 URLs returned HTTP 200 during the check on 4 October 2026. Redirect destinations and response codes are saved in `src/data/resource-checks.json`. HTTP success establishes reachability only; it does not prove that every version statement, market statistic, hiring policy, or original verification claim remains accurate. Historical labels are shown as inherited context. Original resources were neither replaced nor relabeled as newly verified.

## Product and technical decisions

The user's combined choices are implemented as browse mode by default plus optional local task editing. There are no accounts or cloud persistence. Selected week, task search, track filter, status filter, and task updates are stored on this device. Practice-bank counts, schedule settings, and weekly reflections remain source snapshots; they are not editable in this version.

Next.js App Router provides direct pages for views, categories, and task IDs. A shared provider applies local overrides to the single canonical task dataset, so counts and task status stay consistent between pages. Completion checks and local-state validation live in `src/lib`, separate from presentation. Route components remain small, while shared UI components and the visual tokens live under `src/components` and `src/app/globals.css`.

The visual direction is calm and practical: an off-white workspace, green primary actions, blue supporting panels, clear progress context, a weekly selector, and distinct track colors. The interface has mobile navigation, responsive grids, semantic form labels, visible focus styles, and reduced-motion support. Fonts are bundled locally.
