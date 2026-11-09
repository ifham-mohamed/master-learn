<!-- Managed by export_warehouse_plan.py -->

# JA31 — Testcontainers

Week 14 · Core · Warehouse checkpoint [B14](../../projects/B14/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Testcontainers, real PostgreSQL and isolation between test runs.

## Do the work

Run migrations and reservation integration tests against a disposable PostgreSQL instance.

## Pass check

A clean run passes twice with independent data. Preserve the concurrency test result.

## Read and practice

- Run a PostgreSQL-backed test on disposable data and prove that a second run starts cleanly. [Spring Boot Testcontainers reference](https://docs.spring.io/spring-boot/reference/testing/testcontainers.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 146. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> real dependency containers, reproducible DB integration\
> real PostgreSQL/Redis integration tests in containers\
> Run PostgreSQL/Redis dependencies for realistic integration tests

### Exercise / interview prompt

> Postgres container tests\
> Interview: why not H2 for every integration test?\
> Prove transaction/locking behavior against real DB\
> Postgres Testcontainers suite\
> Strong production signal\
> Test against real Postgres container

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja31)
