<!-- Managed by export_warehouse_plan.py -->

# B09 — Measure and fix shipment-list queries

Week 9 · Core · Warehouse checkpoint B09

Before you begin, complete [B08](../../projects/B08/README.md).

## Review and learn

Query count, pagination, testing and fair measurement.

## Do the work

Reproduce and fix an N+1 shipment list query. Add a frontend or service regression test.

## Pass check

Save before and after counts on identical data and verify page correctness.

## Read and practice

- Compare plans for the same fixture and explain the observed scan, join or sort. [PostgreSQL EXPLAIN tutorial](https://www.postgresql.org/docs/current/using-explain.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 102. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: Indexes + query plans\
> Design: Caching introduction + read-path design\
> AI practice: AI verification with targeted regression tests\
> Profile/fix an N+1 query + Vitest service/client tests\
> Read-path caching mini-design\
> Verification drill: regression test an AI-suggested fix

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b09)
