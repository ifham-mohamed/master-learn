<!-- Managed by export_warehouse_plan.py -->

# G05 — Practice window functions, NULLs and duplicate-sensitive joins

Week 7 · Core · Warehouse checkpoint [B07](../../projects/B07/README.md)

Before you begin, complete [CS12](../../cs-and-sql/CS12/README.md).

## Review and learn

NULL handling, duplicate-sensitive joins, and window ordering.

## Do the work

Create a shipment event fixture with duplicates, missing assignments and tied times. Test the report against it.

## Pass check

Save expected and actual rows with explicit tie-breaking and NULL behavior.

## Read and practice

- Use tied timestamps to test your report ordering. [PostgreSQL window functions tutorial](https://www.postgresql.org/docs/current/tutorial-window.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 86. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Solve latest-row-per-group, ranking and running totals. Show how ties, NULLs and duplicate join keys affect the result.

### Exercise / interview prompt

The workbook leaves this cell blank.

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#g05)
