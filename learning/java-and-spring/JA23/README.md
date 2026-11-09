<!-- Managed by export_warehouse_plan.py -->

# JA23 — JPA entities / repositories

Week 8 · Core · Warehouse checkpoint [B08](../../projects/B08/README.md)

Before you begin, complete [JA20](../../java-and-spring/JA20/README.md).

## Review and learn

Entities, keys, relationships and repository boundaries.

## Do the work

Persist warehouse, SKU, stock, shipment and shipment-line records in PostgreSQL. Use versioned migrations.

## Pass check

A restart keeps the data. Referential and uniqueness constraints reject bad rows.

## Read and practice

- Identify the entity and repository boundary. Reproduce the relevant pattern in your PostgreSQL project with a migration. [Spring Data JPA guide](https://spring.io/guides/gs/accessing-data-jpa/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 91. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> mapping, IDs, relationships, repository abstraction\
> entities, repositories, fetch strategy, N+1, query methods, pagination\
> repositories, entity mapping, query methods, pagination, projections, N+1 awareness

### Exercise / interview prompt

> order/customer mapping\
> Interview: entity vs DTO?\
> Fix N+1/query bug and justify mapping\
> JPA order/inventory module\
> Critical Spring backend skill\
> Implement inventory persistence layer

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja23)
