<!-- Managed by export_warehouse_plan.py -->

# JA14 — Threads/executors/futures

Week 10 · Core · Warehouse checkpoint [B10](../../projects/B10/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Executors, tasks, futures, timeouts and coordinated starts.

## Do the work

Build a repeatable two-request reservation test using a bounded executor and a start barrier.

## Pass check

Both requests finish within a timeout. Record which shared state needed protection.

## Read and practice

- Compare a single worker with two workers and bound how long the caller waits. [Oracle Java ExecutorService reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ExecutorService.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 110. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> race conditions, synchronization, executors, CompletableFuture\
> Race, mutex/lock concept, async vs parallel\
> Promises/tasks, race conditions, locks, idempotency concepts\
> threads/executors, synchronization, atomics, CompletableFuture; virtual-thread concept

### Exercise / interview prompt

> counter + booking race lab\
> Interview: what is a race condition?\
> Interview: What is a race condition?\
> Build race-condition + fix demo

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja14)
