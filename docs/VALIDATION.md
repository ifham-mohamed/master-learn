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

## Persistent Google sessions and Node deployment — 5 October 2026

This section supersedes the older browser-only OAuth, missing-client-ID, and local-only deployment notes above.

- Replaced in-memory browser tokens with authorization-code OAuth, PKCE, single-use state, encrypted server-side token storage, and an opaque HttpOnly cookie. Access-token renewal occurs on the server; reviews and writes remain explicit.
- Fifteen tests passed, including encrypted-store reopen, tamper rejection, callback/PKCE exchange, callback replay rejection, restored connection status, token renewal, cross-origin rejection, disconnect, expiry, and hosted access protection. Google HTTP responses were mocked; this is not a live OAuth or spreadsheet-write test.
- Type checking, lint, and the production build passed. The local production sync page loads and reports the one remaining configuration item: GOOGLE_CLIENT_SECRET. Browser warnings/errors were empty during the setup-page check. The existing public client ID and a generated local session key are present; no secret values were printed.
- Added a Render Blueprint for one paid Node service and persistent disk, a hosted startup check, private-app HTTP Basic access protection, a health endpoint, and GitHub Actions checks. The YAML parses and its environment/manual-deployment value types were checked. Render account-side Blueprint validation and Linux CI have not yet run.
- Hosted access tests cover missing configuration, anonymous/incorrect credentials, static asset protection, accepted credentials, and the public health response. Local browsing remains accessible without the hosted password.
- No remote deployment or Google Cloud changes were made. Live sign-in requires the user's client secret and exact callback registration. No real spreadsheet cells were written. Repository commits are local until pushed.
- Hosting files come from the deployed Git checkout; local unpushed learning files and existing browser-origin progress do not transfer automatically. The encrypted file store is limited to a single server with persistent disk. Google Testing refresh tokens may expire after seven days despite the app's 30-day session limit.

## GitHub Pages edition — 5 October 2026

This supersedes the Render deployment plan above. The Render Blueprint and hosted startup command were removed; the secure local Node app remains available.

- The static build completed with 260 exported HTML pages and 1,189 learning files across all 236 tasks. The build runs in an isolated staging folder, excludes backend routes/proxy and local environment files, and publishes only out/.
- Sixteen automated tests passed. Lint and type checking passed. The export checker verified local HTML asset/link targets under /master-learn and confirmed no API routes or environment/session files are present in the published file tree.
- Browser verification against a plain static server confirmed direct CS12 task loading, document/source display, relative links switching to recorded results, direct-route reload, Pages-specific Google setup, and active sidebar selection with trailing slashes. No browser warnings/errors were captured during these checks.
- Browser Sheets sync retains explicit review, conflict acknowledgement, pre-write recheck, and post-write verification. Access tokens remain in memory; expiry clears the connection, and refresh requires reconnecting. The Pages build needs only the public OAuth client ID. Live Google authorization/writes were not exercised in this preview.
- Added a GitHub Pages workflow, repository-subpath configuration, static snapshot export, static preview/check commands, and a complete setup guide. Remote Actions and actual Pages publication remain unverified until the user enables Pages and pushes the commits. The preview used an unset Google client ID and correctly displayed setup instructions.
- Published learning content is public and changes only on deployment. Browser progress remains origin-specific; no migration/import was added. The encrypted server session applies only to local Node use.

## Pages Google reconnect improvement — 5 October 2026

- Moved temporary authorization from the sync component to a page-memory store, preserving it across client-side route navigation. Expiry still invalidates access; a new browser runtime starts disconnected.
- Remembered only a non-secret previous-connection flag in browser storage. Returning users see Reconnect Google, with an empty prompt to avoid forcing Google's default account chooser. A separate account-switch action explicitly requests the chooser. Reconnection is user-triggered and never writes spreadsheet data.
- Seventeen automated tests, lint, and type checking passed. The added test checks connection retention across view unsubscription, expiry rejection, clearing, and an empty new runtime. Live Google popup behavior was not exercised; Google can still require interaction.
- Full-refresh login persistence remains unavailable in the selected in-memory Pages design. No token persistence or automatic refresh token flow was added. Documentation describes this limitation explicitly.
