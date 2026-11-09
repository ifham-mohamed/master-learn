<!-- Managed by export_warehouse_plan.py -->

# TS28 — Browser/web security

Week 11 · Core · Warehouse checkpoint [B11](../../projects/B11/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

XSS, CSRF, CORS, cookie flags and safe sign-out.

## Do the work

Test unsafe-looking text rendering and missing CSRF. Remove private client state when the session ends.

## Pass check

Text renders safely, the forged write is denied, and sensitive views clear after logout.

## Read and practice

- Use a training lab to recognize an ownership bypass. Create a regression check using synthetic project accounts. [PortSwigger access control labs](https://portswigger.net/web-security/access-control)

## Further architecture practice

- **4. Release a Tracking micro-frontend.** Deploy and roll back the Tracking frontend without rebuilding Dispatch. Verify keyboard navigation, direct URLs, sign-out, API failure fallback, and bundle size before and after the split. Start after [B20](../../projects/B20/README.md).

[Independently deployable micro-frontends](https://martinfowler.com/articles/micro-frontends.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 122. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> XSS, CSRF, CORS, token storage, secrets\
> Explain browser security boundaries and mitigations\
> SQLi, XSS, CSRF, CORS, secrets, rate limiting\
> SQLi, XSS, CSRF, SSRF concept, auth mistakes

### Exercise / interview prompt

> security review UI/API flow\
> Interview: where should tokens live?\
> Interview: CORS vs CSRF?\
> Review insecure endpoint/UI flow\
> Security checklist\
> Shared

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts28)
