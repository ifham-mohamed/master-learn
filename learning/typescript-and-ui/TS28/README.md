<!-- Managed by export_warehouse_plan.py -->

# TS28 — Browser/web security

Week 11 · Core · Warehouse checkpoint B11

Before you begin, complete G02.


## Review and learn

XSS, CSRF, CORS, cookie flags and safe sign-out.

## Do the work

Test unsafe-looking text rendering and missing CSRF. Remove private client state when the session ends.

## Pass check

Text renders safely, the forged write is denied, and sensitive views clear after logout.

## References

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Independently deployable micro-frontends](https://martinfowler.com/articles/micro-frontends.html)


## Further architecture practice

- 4. Release a Tracking micro-frontend · after B20. Deploy and roll back the Tracking frontend without rebuilding Dispatch. Verify keyboard navigation, direct URLs, sign-out, API failure fallback, and bundle size before and after the split.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts28)
