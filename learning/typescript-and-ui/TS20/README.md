<!-- Managed by export_warehouse_plan.py -->

# TS20 — Routing / boundaries

Week 6 · Core · Warehouse checkpoint [B06](../../projects/B06/README.md)

Before you begin, complete [TS17](../../typescript-and-ui/TS17/README.md).

## Review and learn

React routes, parameters and route-level fallback states.

## Do the work

Add list, detail and create routes. Handle an unknown reference and direct navigation.

## Pass check

Direct refresh and navigation work. Missing references show a useful fallback.

## Read and practice

- Add a nested route and verify a direct URL, including a missing shipment. [React Router route guide](https://reactrouter.com/start/declarative/routing)

## Further architecture practice

- **4. Release a Tracking micro-frontend.** Deploy and roll back the Tracking frontend without rebuilding Dispatch. Verify keyboard navigation, direct URLs, sign-out, API failure fallback, and bundle size before and after the split. Start after [B20](../../projects/B20/README.md).

[Independently deployable micro-frontends](https://martinfowler.com/articles/micro-frontends.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 75. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> server/client components concept, routing, data flow\
> routing, server/client boundaries, data fetching, auth/BFF concepts\
> Routing, server/client boundaries, data fetching, auth/BFF

### Exercise / interview prompt

> Next frontend for Boot API\
> Interview: where should data fetching/auth live?\
> Trace a request from page to Spring Boot API\
> Next.js + Spring Boot integration\
> Use as frontend/BFF when appropriate

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts20)
