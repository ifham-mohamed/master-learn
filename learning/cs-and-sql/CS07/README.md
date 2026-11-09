<!-- Managed by export_warehouse_plan.py -->

# CS07 — ACID

Week 3 · Core · Warehouse checkpoint [B03](../../projects/B03/README.md)

## Review and learn

ACID, commit and rollback.

## Do the work

Run a PostgreSQL transaction that changes reservation and stock records. Intentionally fail partway.

## Pass check

A second connection sees no partial reservation and final balances reconcile.

## Read and practice

- Predict the visible rows before and after a rollback, then check from a second session. [PostgreSQL transactions tutorial](https://www.postgresql.org/docs/current/tutorial-transactions.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 31. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Explain each property using payment/order example

### Exercise / interview prompt

> Interview: Why do transactions matter?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#cs07)
