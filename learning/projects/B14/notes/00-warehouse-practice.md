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

Write the work yourself. Save the command or scenario, actual result, and next action in [Results](../results/evidence.md) or in Learnspace. Include a commit or result path when useful.
