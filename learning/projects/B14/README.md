<!-- Managed by export_warehouse_plan.py -->

# B14 — Run PostgreSQL integration tests and CI

Week 14 · Core · Warehouse checkpoint B14

Before you begin, complete [B13](../../projects/B13/README.md).

## Review and learn

PostgreSQL integration tests, Docker Compose and CI.

## Do the work

Run real-database migration and concurrency tests. Add a repeatable local stack and CI gates.

## Pass check

A clean run starts the stack and passes the tests twice with isolated test data.

## Read and practice

- Run a PostgreSQL-backed test on disposable data and prove that a second run starts cleanly. [Spring Boot Testcontainers reference](https://docs.spring.io/spring-boot/reference/testing/testcontainers.html)

## Further architecture practice

- **1. Establish service boundaries.** A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split. Start after [B14](../../projects/B14/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 150. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: Concurrency/transaction revision\
> Design: Queues + idempotent consumers\
> AI practice: AI-assisted build/infra task with reproducibility checks\
> Postgres Testcontainers + Docker Compose + CI quality gates\
> Queues - Email/payment webhook processing\
> Reliability - Unreliable payment provider\
> Reproduce build/infra changes from clean environment

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b14)
