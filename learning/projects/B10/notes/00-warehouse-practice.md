# B10 — Reserve and release stock safely under contention

Week 10 · Core · Warehouse checkpoint B10

Before you begin, complete B09.


## Review and learn

Inventory balance, atomic transactions, row contention and rollback.

## Do the work

Reserve all shipment lines together. Add a cancel action that releases a reservation once. Run two concurrent requests for the last unit.

## Pass check

One request succeeds and one conflicts. Partial failure rolls back and available stock never becomes negative.

Write the work yourself. Save the command or scenario, actual result, and next action in [Results](../results/evidence.md) or in Learnspace. Include a commit or result path when useful.
