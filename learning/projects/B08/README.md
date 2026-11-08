<!-- Managed by export_warehouse_plan.py -->

# B08 — Persist shipments and receive stock in PostgreSQL

Week 8 · Core · Warehouse checkpoint B08

Before you begin, complete B07.


## Review and learn

PostgreSQL schema, constraints, migrations and frontend build checks.

## Do the work

Persist warehouses, SKUs, stock, shipments and lines. Implement stock receipt with a positive quantity and a unique receipt reference.

## Pass check

Migrations work on new and populated data. Receipt increases on-hand stock once, a duplicate is rejected, and data survives restart.




## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b08)
