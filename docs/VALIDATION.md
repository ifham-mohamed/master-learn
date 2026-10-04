# Validation

Checked on 4 October 2026.

## Automated checks

- Six data and behavior tests cover the complete import counts, unique task IDs, all 21 original file hashes, all 11 category memberships, source-reference resolution, 145-problem target reconciliation, completion requirements, failed-mock semantics, invalid local-state rejection, and safe outbound URL protocols.
- TypeScript strict checks pass.
- ESLint passes.
- The Next.js production build passes and prerenders all 236 task pages, all 11 category pages, and the main workspace views.
- All 38 resource URLs returned HTTP 200. The response check is not a content or hiring-policy audit.

## Browser checks

- Logo toggle refinement: at 1200 × 760, the collapsed logo ends at 65px and Overview starts at 95px. The hidden toggle occupies the logo slot, not a second navigation row. Keyboard focus reveals the expand control and Enter expands the sidebar. Header elements no longer shrink into adjacent navigation on short screens.

- Navigation upgrade: desktop compact mode persists after reload; icon tooltips appear on keyboard focus and dismiss with Escape. Category pages highlight both their parent section and selected focus area.
- Mobile navigation upgrade: the drawer is labeled as a dialog, background content is inert, focus cycles within the drawer, and Escape restores focus to the menu trigger. Confirmed at 390px without horizontal overflow.

- Desktop overview rendered at 1440px with no horizontal overflow.
- Mobile practice and weekly pages inspected at 390px; navigation, search, and layout worked without horizontal overflow.
- Master-plan search for JOINs returned three relevant tasks from the imported data.
- Task progress was changed temporarily, saved, and verified after reload. The test change was then restored to the original source values.
- The selected week was changed to week 5 and remained selected after reload.
- Editing is off after reload; locally saved progress remains available in browse mode.
- Original and added resource links appear separately in task details.

## File-based learning workspace verification

- Created category/task folders and five content sections for all 236 tasks across 11 categories. Rerunning `npm run learning:init` created zero files and preserved existing work.
- `npm test`: eight tests passed, including live manifest changes, text-size limits, task/path validation, hidden/generated file exclusion, and junction rejection.
- Type checking, lint, and the production build passed. The build includes 258 prerendered pages and a dynamic read-only learning-file endpoint.
- The CS12 SQLite example executed all five expected-row checks successfully. Its actual output and runtime versions are saved under `learning/cs-and-sql/CS12/results/`.
- Browser checks confirmed Markdown rendering, relative links switching sections, JSX source display, and sandboxed static HTML rendering.
- Added, edited, and removed a temporary note while the task remained open. The viewer updated automatically; the temporary file was removed afterward.
- Compact navigation kept the graduation logo clear of Overview, and expansion remained clickable. The task page at a 390px viewport had no document-level horizontal overflow; content tabs scroll within their own area.
- No warnings or errors were captured in the clean in-app browser during these checks. Root-only hydration suppression tolerates the supplied extension-injected attribute; the user's extension itself was not modified or independently reproduced.

## Responsive layout and theme update — 5 October 2026

- Removed the learning grid's maximum height, which allowed content to overflow beneath the footer. The viewer now follows the full document height.
- Compared document bottoms with footer positions for long source and Markdown at 320px, 820px, 1144px, and 1920px viewports. The footer followed the document, with no document-level horizontal overflow. Checked the dark overview at 390px too.
- Added shared pastel surface/text tokens, light/dark mode, a remembered theme choice, and a graduation-cap SVG favicon. Native View Transitions reveal the new theme from the button; unsupported browsers and reduced-motion preferences skip the animation.
- Verified theme switching and persistence after reload. Browser console checks returned no warnings/errors during these interactions.
- Eight automated tests, type checking, lint, and the production build passed. The build now includes the icon route (259 prerendered entries).
- Removed the four saved JPEG previews. Future temporary UI captures belong in the ignored `artifacts/` folder.

## Application handbook — 5 October 2026

- Added nine searchable, fully readable chapters to Plan & guidance, covering navigation, practice folders, coding, results, progress, backups, the codebase, and troubleshooting. Original workbook guidance remains available below the handbook.
- Added handbook links to the learning library and each task workspace.
- Browser checks verified a search for SQLite returned the code-running chapter, an unmatched search showed an empty state, and Clear search restored all nine chapters. Chapter links positioned headings below the sticky header.
- Checked mobile reading at 390px and desktop dark mode without horizontal page overflow or browser console warnings/errors. Type checking, lint, and the production build passed.

## Operational limits

- `npm audit --omit=dev` reports no production dependency vulnerabilities. The full audit currently reports five high-severity entries in the development lint dependency chain (`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`). These are related entries for a nested-pattern denial-of-service advisory. No patched `braces` release was available in the registry when checked; do not downgrade Next.js to satisfy the audit's proposed major-version change. Recheck the tooling dependencies when a compatible patch is released.
- Local progress belongs to the browser origin. Switching hostnames or ports creates a separate store. Clearing storage removes local updates. The original files remain intact.
- JSON export is available, but backup import and cloud synchronization are not implemented.
- Practice records, estimates, capacity, start date, and weekly reflections are browsable source data. Only task progress fields are editable in the website.
- The automated tests do not establish actual interview readiness, independently verify the learner's recorded evidence, or audit the generated spreadsheet chart libraries.
- This is a local application preview; no public deployment or repository commit was performed.

## Handbook controls and optional Sheets sync — 5 October 2026

- Active chapter links follow click, hash navigation, and document scrolling using aria-current; open disclosure arrows rotate and support keyboard toggling. Browser checks confirmed chapter 3 selection and open/close arrow behavior.
- Inspected the user's live Final Tracker XLSX export without modifying it. Mapped nine progress inputs in Master Plan; formula columns are excluded.
- Added Google OAuth token-based manual review/sync UI, before/after cell changes, explicit conflict acknowledgement, pre-write recheck, and post-write verification. No database, client secret, or service-account credentials are used.
- Twelve tests passed, including row-ID lookup, header/duplicate/formula rejection, conflict detection, untouched remote field preservation, already-synced values, and numeric completion dates. Type checking, lint, and production build passed.
- Live OAuth and writes are not verified: no Google OAuth client ID is configured. The UI explains setup and disables review until connected. No cells in the real spreadsheet were changed.

- Localhost connection fix: startup scripts bind to localhost instead of IPv4-only 127.0.0.1, matching the OAuth origin and this machine's IPv6 localhost resolution. Rebuilt with the configured public client ID and verified the production sync page loads at http://localhost:3100/sync.
