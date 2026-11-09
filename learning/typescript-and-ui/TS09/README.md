<!-- Managed by export_warehouse_plan.py -->

# TS09 — Union/intersection/narrowing

Week 2 · Core · Warehouse checkpoint [B02](../../projects/B02/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Discriminated unions, narrowing and exhaustive cases.

## Do the work

Model loading, success, empty and failed shipment states as a union.

## Pass check

Each valid state renders and adding a new case forces the missing branch to be handled.

## Read and practice

- Build a tiny fixture for this task and change one assumption to see the compiler response. [TypeScript Playground](https://www.typescriptlang.org/play/)
- Add a case to a discriminated union and use the compiler to find an unhandled state. [TypeScript narrowing handbook](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 25. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> discriminated unions, guards, exhaustive checks

### Exercise / interview prompt

> typed state machine\
> Interview: how model API states safely?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts09)
