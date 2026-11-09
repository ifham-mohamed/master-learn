<!-- Managed by export_warehouse_plan.py -->

# CS10 — Transactions/isolation

Week 10 · Core · Warehouse checkpoint [B10](../../projects/B10/README.md)

## Review and learn

Isolation levels, concurrent sessions and lost updates.

## Do the work

Use two PostgreSQL connections to observe a conflicting reservation or a changed read between statements.

## Pass check

Record transaction order, observed values, and the fix or retry requirement.

## Read and practice

- Write a two-session timeline and compare one observed result at two isolation levels. [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 108. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Dirty/non-repeatable/phantom/lost update concepts\
> Atomicity, isolation levels, lost update, phantom concept

### Exercise / interview prompt

> Interview: Prevent double booking?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#cs10)
