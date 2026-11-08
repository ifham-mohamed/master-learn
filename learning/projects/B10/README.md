<!-- Managed by export_warehouse_plan.py -->

# B10 — Reserve and release stock safely under contention

Week 10 · Core · Warehouse checkpoint B10

Before you begin, complete B09.


## Review and learn

Inventory balance, atomic transactions, row contention and rollback.

## Do the work

Reserve all shipment lines together. Add a cancel action that releases a reservation once. Run two concurrent requests for the last unit.

## Pass check

One request succeeds and one conflicts. Partial failure rolls back and available stock never becomes negative.




## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b10)
