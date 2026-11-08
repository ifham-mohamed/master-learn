# B10 — Double-booking race lab using transaction/constraint/locking

Week 10 · Core · Warehouse checkpoint B10

## Review and learn

Inventory balance, atomic transactions, row contention and rollback.

## Do the work

Reserve all shipment lines together. Add a cancel action that releases a reservation once. Run two concurrent requests for the last unit.

## Pass check

One request succeeds and one conflicts. Partial failure rolls back and available stock never becomes negative.

Write the implementation and checks yourself. Use documentation, the debugger and actual runs. Save what you ran, what happened, and your next action in [Results](../results/evidence.md) or record it in Learnspace. Include a commit or result path when useful.
