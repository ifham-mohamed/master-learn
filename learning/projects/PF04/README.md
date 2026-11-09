<!-- Managed by export_warehouse_plan.py -->

# PF04 — Spring Boot and PostgreSQL backend showcase

Week 20 · Optional · Warehouse checkpoint [B20](../../projects/B20/README.md)

Before you begin, complete [B20](../../projects/B20/README.md).

## Review and learn

Backend project demonstration, PostgreSQL and security.

## Do the work

Prepare a Spring Boot showcase of migration, reservation and permission enforcement.

## Pass check

Provide a repeatable demo with one success and one business conflict.

## Read and practice

- Identify the entity and repository boundary. Reproduce the relevant pattern in your PostgreSQL project with a migration. [Spring Data JPA guide](https://spring.io/guides/gs/accessing-data-jpa/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 212. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Evidence: JUnit + MockMvc + Testcontainers\
> Security: RBAC + ownership/tenant boundaries\
> Reliability: Transactions, idempotency, retry, caching\
> Write a 2-minute story and a project deep dive with your own contribution, defect, trade-off and measured result.

### Exercise / interview prompt

> Source status: Recommended capstone\
> Contribution: Solo\
> Bug: Capture one transaction/locking bug\
> Trade-off: Optimistic vs pessimistic lock; constraint vs app validation\
> Implement 6 interview-grade endpoints + tests

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#pf04)
