# B10 — Reserve and release stock safely under contention

Week 10 · Core · Warehouse checkpoint B10

Before you begin, complete B09.


## Review and learn

Inventory balance, atomic transactions, row contention and rollback.

## Do the work

Reserve all shipment lines together. Add a cancel action that releases a reservation once. Run two concurrent requests for the last unit.

## Pass check

One request succeeds and one conflicts. Partial failure rolls back and available stock never becomes negative.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
