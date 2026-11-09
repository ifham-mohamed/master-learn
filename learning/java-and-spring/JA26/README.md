<!-- Managed by export_warehouse_plan.py -->

# JA26 — Locking / concurrency

Week 10 · Core · Warehouse checkpoint [B10](../../projects/B10/README.md)

Before you begin, complete [JA25](../../java-and-spring/JA25/README.md).

## Review and learn

Concurrent updates, lock scope and conditional writes.

## Do the work

Reproduce contention for the last unit. Choose row locking or an atomic conditional update and keep lock ordering consistent.

## Pass check

Two concurrent requests yield one success, one conflict, and a valid stock balance.

## Read and practice

- Open two sessions and record which statement blocks, commits or rolls back. [PostgreSQL explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 112. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> optimistic/pessimistic locks, unique constraints, retries\
> Use transaction/constraint/idempotency appropriately\
> race conditions and atomicity\
> @Transactional, isolation, optimistic/pessimistic locking, retries\
> Races, locking, optimistic control, consistency concepts\
> optimistic/pessimistic locks, versioning, unique constraints, retries

### Exercise / interview prompt

> concurrent integration test\
> Interview: prevent two bookings for same slot?\
> Prevent duplicate order/booking under concurrency\
> Practice mode: AI-free Yes, AI-assisted Yes\
> Design: Prevent double booking\
> Trade-off: lock vs optimistic control\
> Prevent duplicate/overlapping booking under concurrency\
> Concurrency booking lab\
> High interview value\
> Prevent double booking under race

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja26)
