# B14 — Run PostgreSQL integration tests and CI

Week 14 · Core · Warehouse checkpoint B14

Before you begin, complete B13.


## Review and learn

PostgreSQL integration tests, Docker Compose and CI.

## Do the work

Run real-database migration and concurrency tests. Add a repeatable local stack and CI gates.

## Pass check

A clean run starts the stack and passes the tests twice with isolated test data.

## Further architecture practice

- 1. Establish service boundaries · after B14. A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
