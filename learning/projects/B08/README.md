<!-- Managed by export_warehouse_plan.py -->

# B08 — Persist shipments and receive stock in PostgreSQL

Week 8 · Core · Warehouse checkpoint B08

Before you begin, complete [B07](../../projects/B07/README.md).

## Review and learn

PostgreSQL schema, constraints, migrations and frontend build checks.

## Do the work

Persist warehouses, SKUs, stock, shipments and lines. Implement stock receipt with a positive quantity and a unique receipt reference.

## Pass check

Migrations work on new and populated data. Receipt increases on-hand stock once, a duplicate is rejected, and data survives restart.

## Read and practice

- Identify the entity and repository boundary. Reproduce the relevant pattern in your PostgreSQL project with a migration. [Spring Data JPA guide](https://spring.io/guides/gs/accessing-data-jpa/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 95. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: Index fundamentals + DB modeling review\
> Design: Database schema and query-path review\
> AI practice: AI verification: inspect diff, tests and assumptions\
> Persist customer/order model + clean frontend build/typecheck pipeline\
> Review JPA schema and query path from API to DB\
> LLM API - Build a safe server-side call\
> Structured output - Generate typed object and reject invalid

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b08)
