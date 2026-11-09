<!-- Managed by export_warehouse_plan.py -->

# TS19 — Rendering / performance

Week 6 · Core · Warehouse checkpoint [B06](../../projects/B06/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Render cost, React profiling and deliberate optimization.

## Do the work

Profile a representative shipment list before deciding whether memoization, pagination or virtualization is useful.

## Pass check

Save comparable before and after measurements and report what changed.

## Read and practice

- Record a before and after render measurement on the same fixture. [React Profiler reference](https://react.dev/reference/react/Profiler)

## Further architecture practice

- **4. Release a Tracking micro-frontend.** Deploy and roll back the Tracking frontend without rebuilding Dispatch. Verify keyboard navigation, direct URLs, sign-out, API failure fallback, and bundle size before and after the split. Start after [B20](../../projects/B20/README.md).

[Independently deployable micro-frontends](https://martinfowler.com/articles/micro-frontends.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 74. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> keys, memoization basics, state placement\
> Bundle/loading, caching, rendering, Core Web Vitals concepts

### Exercise / interview prompt

> profile rerender issue\
> Interview: when does memo help/hurt?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts19)
