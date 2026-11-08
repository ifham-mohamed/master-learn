# B08 — Persist shipments and receive stock in PostgreSQL

Week 8 · Core · Warehouse checkpoint B08

Before you begin, complete B07.


## Review and learn

PostgreSQL schema, constraints, migrations and frontend build checks.

## Do the work

Persist warehouses, SKUs, stock, shipments and lines. Implement stock receipt with a positive quantity and a unique receipt reference.

## Pass check

Migrations work on new and populated data. Receipt increases on-hand stock once, a duplicate is rejected, and data survives restart.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
