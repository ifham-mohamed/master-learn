<!-- Managed by export_warehouse_plan.py -->

# CS12 — JOINs

Week 1 · Core · Warehouse checkpoint [B01](../../projects/B01/README.md)

## Review and learn

INNER JOIN, LEFT JOIN, join keys, and filters in ON versus WHERE.

## Do the work

Query warehouses with assigned shipments, including a warehouse with none. Adapt the existing fixture and rerun on PostgreSQL when available.

## Pass check

Save expected and actual rows. Explain why a WHERE filter can remove the unmatched warehouse.

## Read and practice

- Solve one join without the answer, then make a warehouse fixture with an unmatched row. [PostgreSQL Exercises joins and subqueries](https://pgexercises.com/questions/joins/)

## Earlier SQL worked example

For a separate SQLite demonstration, see the [JOIN walkthrough](theory/01-worked-example.md), [run instructions](code/01-run-example.md), and [recorded example results](results/evidence.md). Write your own PostgreSQL warehouse queries for the current task.

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 9. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> INNER/LEFT and multi-table reasoning\
> JOINs, GROUP BY, HAVING, subqueries, CTEs, CASE, aggregates

### Exercise / interview prompt

> Interview: Return customers with/without orders

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#cs12)
