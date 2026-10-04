# Learnspace

A Next.js learning workspace built from the supplied **Final Tracker** workbook and HTML exports. Explore the 24-week journey, 236 tasks, 11 learning tracks, 74 practice entries, five project profiles, and 38 resources in a light green-and-blue interface.

## Run locally

Requires Node.js 20.9 or later (Node 24 was used for validation).

```sh
npm ci
npm run dev
```

Open [the local workspace](http://127.0.0.1:3000). For a production build, run `npm run build`, then `npm start`.

## How to use it

- **Overview** connects the selected week, recorded progress, workload, and learning tracks.
- **Weekly journey** lets you explore all 24 weeks. The selected week is remembered on this device.
- **Master plan** supports search, category filters, and status filters. Open any task for its full deliverable, practice prompt, prerequisites, original references, and suggested guides.
- **Practice bank** contains expandable patterns and questions; practice counts remain the supplied workbook snapshot.
- **Projects** explains the five project profiles as one connected capstone with optional extensions.
- **Resource library** keeps original notes separate from newly added official learning guides. HTTP availability was checked on 4 October 2026; this does not verify all inherited claims.
- **Plan & guidance** preserves the original workflow notes, strategy, gap review, and interview checklist.

Browsing is the default. **Edit progress** enables task-only editing: status, evidence, next action, hours, confidence, completion date, and mock scores/results. Updates are stored in this browser under `learnspace-progress-v1`, without accounts or a cloud service. Editing is switched off on reload. Progress and filters persist. **Export local progress** downloads a JSON backup; automatic backup restoration is not implemented. Clearing browser storage removes local updates. The original workbook is never rewritten.

## Folder structure

```text
sources/                     Untouched input files
  Final Tracker.xlsx         Authoritative workbook
  html/                      All 16 HTML exports and their resources/
src/
  app/                       Next.js routes, layout, and design system styles
    [view]/                  Weekly plan, master plan, practice, projects, resources, guide
    tasks/[id]/              Individual task pages
    tracks/[slug]/           Category views
  components/                Navigation, views, task details, local state, shared components
  data/                      Normalized curriculum and resource availability results
  lib/                       Data types, completion rules, validation, formatting
scripts/                     Reproducible workbook import and resource checking
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
