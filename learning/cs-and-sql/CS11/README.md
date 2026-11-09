<!-- Managed by export_warehouse_plan.py -->

# CS11 — Locks/deadlocks

Week 10 · Core · Warehouse checkpoint [B10](../../projects/B10/README.md)

## Review and learn

Row locks, deadlocks and consistent lock order.

## Do the work

Reserve multiple SKU rows from two transactions in opposite orders, then repeat with one consistent order.

## Pass check

Record the deadlock or timeout, then show the corrected test and rollback behavior.

## Read and practice

- Open two sessions and record which statement blocks, commits or rolls back. [PostgreSQL explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 109. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Recognize and mitigate conflicting lock orders\
> Recognize race/deadlock scenarios and mitigation

### Exercise / interview prompt

> Interview: How can deadlock occur?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#cs11)
