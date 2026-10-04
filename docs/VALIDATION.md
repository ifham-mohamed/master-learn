# Validation

Checked on 4 October 2026.

## Automated checks

- Six data and behavior tests cover the complete import counts, unique task IDs, all 21 original file hashes, all 11 category memberships, source-reference resolution, 145-problem target reconciliation, completion requirements, failed-mock semantics, invalid local-state rejection, and safe outbound URL protocols.
- TypeScript strict checks pass.
- ESLint passes.
- The Next.js production build passes and prerenders all 236 task pages, all 11 category pages, and the main workspace views.
- All 38 resource URLs returned HTTP 200. The response check is not a content or hiring-policy audit.

## Browser checks

- Desktop overview rendered at 1440px with no horizontal overflow.
- Mobile practice and weekly pages inspected at 390px; navigation, search, and layout worked without horizontal overflow.
- Master-plan search for JOINs returned three relevant tasks from the imported data.
- Task progress was changed temporarily, saved, and verified after reload. The test change was then restored to the original source values.
- The selected week was changed to week 5 and remained selected after reload.
- Editing is off after reload; locally saved progress remains available in browse mode.
- Original and added resource links appear separately in task details.

## Limits and maintenance notes

- `npm audit --omit=dev` reports no production dependency vulnerabilities. The full audit currently reports five high-severity entries in the development lint dependency chain (`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`). These are related entries for a nested-pattern denial-of-service advisory. No patched `braces` release was available in the registry when checked; do not downgrade Next.js to satisfy the audit's proposed major-version change. Recheck the tooling dependencies when a compatible patch is released.
- Local progress belongs to the browser origin. Switching hostnames or ports creates a separate store. Clearing storage removes local updates. The original files remain intact.
- JSON export is available, but backup import and cloud synchronization are not implemented.
- Practice records, estimates, capacity, start date, and weekly reflections are browsable source data. Only task progress fields are editable in the website.
- The automated tests do not establish actual interview readiness, independently verify the learner's recorded evidence, or audit the generated spreadsheet chart libraries.
- This is a local application preview; no public deployment or repository commit was performed.
