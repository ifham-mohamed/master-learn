<!-- Managed by export_warehouse_plan.py -->

# CS15 — Process vs thread

Week 4 · Core · Warehouse checkpoint [B04](../../projects/B04/README.md)

## Review and learn

Processes, threads and shared versus isolated memory.

## Do the work

Compare separate CLI processes with concurrent work inside one Java process.

## Pass check

Record which state is visible to each worker and where a race could occur.

## Read and practice

- Compare a single worker with two workers and bound how long the caller waits. [Oracle Java ExecutorService reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ExecutorService.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 42. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Address space, scheduling, shared state\
> Process/thread, memory, scheduling, file/system basics

### Exercise / interview prompt

> Interview: Process vs thread?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#cs15)
