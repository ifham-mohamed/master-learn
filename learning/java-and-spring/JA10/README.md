<!-- Managed by export_warehouse_plan.py -->

# JA10 — Exceptions

Week 3 · Core · Warehouse checkpoint [B03](../../projects/B03/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Validation, domain exceptions, failure boundaries and recoverability.

## Do the work

Distinguish bad input, unknown shipment and a failed business rule. Recover at the terminal boundary.

## Pass check

Every failure has an actionable message and returns to the menu without partial state.

## Read and practice

- Trace where an invalid quantity is detected and where your menu can recover. [Dev.java exceptions guide](https://dev.java/learn/language/annotations-exceptions/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 34. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> checked/unchecked, custom exceptions, try-with-resources\
> Design error boundaries, retries, typed errors, failure paths

### Exercise / interview prompt

> API exception taxonomy\
> Interview: when should you catch vs propagate?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja10)
