<!-- Managed by export_warehouse_plan.py -->

# JA24 — Queries / N+1

Week 9 · Core · Warehouse checkpoint [B09](../../projects/B09/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Lazy loading, N+1, query shapes and pagination.

## Do the work

Measure queries for the shipment list with multiple line items. Fix the query with a deliberate fetch strategy.

## Pass check

Compare query counts on the same fixture and confirm results and pagination remain correct.

## Read and practice

- Compare plans for the same fixture and explain the observed scan, join or sort. [PostgreSQL EXPLAIN tutorial](https://www.postgresql.org/docs/current/using-explain.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 100. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> query methods, JPQL concept, projections, fetch strategy

### Exercise / interview prompt

> catalogue query profiling\
> Interview: what is N+1 and how detect/fix it?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja24)
