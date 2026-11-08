# B08 — Persist customer/order model + clean frontend build/typecheck pipeline

Week 8 · Core · Warehouse checkpoint B08

## Review and learn

PostgreSQL schema, constraints, migrations and frontend build checks.

## Do the work

Persist warehouses, SKUs, stock, shipments and lines. Implement stock receipt with a positive quantity and a unique receipt reference.

## Pass check

Migrations work on new and populated data. Receipt increases on-hand stock once, a duplicate is rejected, and data survives restart.

Write the implementation and checks yourself. Use documentation, the debugger and actual runs. Save what you ran, what happened, and your next action in [Results](../results/evidence.md) or record it in Learnspace. Include a commit or result path when useful.
