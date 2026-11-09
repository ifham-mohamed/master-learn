<!-- Managed by export_warehouse_plan.py -->

# B10 — Reserve and release stock safely under contention

Week 10 · Core · Warehouse checkpoint B10

Before you begin, complete [B09](../../projects/B09/README.md).

## Review and learn

Inventory balance, atomic transactions, row contention and rollback.

## Do the work

Reserve all shipment lines together. Add a cancel action that releases a reservation once. Run two concurrent requests for the last unit.

## Pass check

One request succeeds and one conflicts. Partial failure rolls back and available stock never becomes negative.

## Read and practice

- Open two sessions and record which statement blocks, commits or rolls back. [PostgreSQL explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 113. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: Isolation levels + locks/deadlocks + OS concurrency\
> Design: Concurrency + atomic transactions\
> AI practice: AI may suggest fixes; independently prove race safety\
> Double-booking race lab using transaction/constraint/locking\
> Concurrency - Prevent double booking\
> Transactions - Checkout + inventory decrement\
> Adversarial check: prove concurrency correctness independently

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b10)
