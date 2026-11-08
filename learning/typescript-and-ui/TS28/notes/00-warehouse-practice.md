# TS28 — Browser/web security

Week 11 · Core · Warehouse checkpoint B11

Before you begin, complete G02.


## Review and learn

XSS, CSRF, CORS, cookie flags and safe sign-out.

## Do the work

Test unsafe-looking text rendering and missing CSRF. Remove private client state when the session ends.

## Pass check

Text renders safely, the forged write is denied, and sensitive views clear after logout.

## Further architecture practice

- 4. Release a Tracking micro-frontend · after B20. Deploy and roll back the Tracking frontend without rebuilding Dispatch. Verify keyboard navigation, direct URLs, sign-out, API failure fallback, and bundle size before and after the split.

Write the work yourself. Save the command or scenario, actual result, and next action in [Results](../results/evidence.md) or in Learnspace. Include a commit or result path when useful.
