<!-- Managed by export_warehouse_plan.py -->

# JA26 — Locking / concurrency

Week 10 · Core · Warehouse checkpoint B10

Before you begin, complete JA25.


## Review and learn

Concurrent updates, lock scope and conditional writes.

## Do the work

Reproduce contention for the last unit. Choose row locking or an atomic conditional update and keep lock ordering consistent.

## Pass check

Two concurrent requests yield one success, one conflict, and a valid stock balance.

## References

- [Spring guides by topic](https://spring.io/guides)




## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja26)
