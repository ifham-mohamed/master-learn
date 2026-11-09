<!-- Managed by export_warehouse_plan.py -->

# TS15 — Async/await + errors

Week 4 · Core · Warehouse checkpoint [B04](../../projects/B04/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Async/await, rejected promises and cleanup.

## Do the work

Load a shipment through an async adapter. Handle rejection and a slow request that outlives a change of selection.

## Pass check

An older response cannot replace the current shipment. Failure remains visible.

## Read and practice

- Predict execution order for a promise and a timer, then trace the result. [MDN JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 49. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Promise composition, try/catch, cancellation concept, retries

### Exercise / interview prompt

> API retry/error lab\
> Interview: Promise.all vs allSettled?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts15)
