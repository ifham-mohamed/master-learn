<!-- Managed by export_warehouse_plan.py -->

# SD12 — Search

Week 15 · Core · Warehouse checkpoint [B15](../../projects/B15/README.md)

## Review and learn

Query filtering, indexes, search relevance and pagination.

## Do the work

Implement or prototype search by shipment reference and filter by warehouse and status.

## Pass check

Results match fixture cases, tenant scope and stable pagination.

## Read and practice

- Measure the existing lookup on a representative fixture before adding a cache or search component. [PostgreSQL query plan tutorial](https://www.postgresql.org/docs/current/using-explain.html)

## Further architecture practice

- **6. Measure algorithms against warehouse workloads.** Save a baseline, input size, edge cases and measured costs. Explain which structures belong in the main application and which remain interview or design exercises. Start after [B10](../../projects/B10/README.md).

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 162. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> DB index vs search service concept

### Exercise / interview prompt

> Design: Product/business search\
> Trade-off: features vs complexity

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd12)
