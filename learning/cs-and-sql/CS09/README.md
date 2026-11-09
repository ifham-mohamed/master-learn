<!-- Managed by export_warehouse_plan.py -->

# CS09 — Indexes

Week 9 · Core · Warehouse checkpoint [B09](../../projects/B09/README.md)

## Review and learn

Indexes, selectivity, EXPLAIN and write overhead.

## Do the work

Measure a filtered dispatch list query before and after an index on representative PostgreSQL data.

## Pass check

Save both plans and explain the measured change and index cost.

## Read and practice

- Compare plans for the same fixture and explain the observed scan, join or sort. [PostgreSQL EXPLAIN tutorial](https://www.postgresql.org/docs/current/using-explain.html)

## Further architecture practice

- **6. Measure algorithms against warehouse workloads.** Save a baseline, input size, edge cases and measured costs. Explain which structures belong in the main application and which remain interview or design exercises. Start after [B10](../../projects/B10/README.md).

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 99. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> B-tree concept, selectivity, composite order\
> Choose indexes, composite order, scan trade-offs

### Exercise / interview prompt

> Interview: Why is this query slow?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#cs09)
