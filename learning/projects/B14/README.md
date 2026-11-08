<!-- Managed by export_warehouse_plan.py -->

# B14 — Run PostgreSQL integration tests and CI

Week 14 · Core · Warehouse checkpoint B14

Before you begin, complete B13.


## Review and learn

PostgreSQL integration tests, Docker Compose and CI.

## Do the work

Run real-database migration and concurrency tests. Add a repeatable local stack and CI gates.

## Pass check

A clean run starts the stack and passes the tests twice with isolated test data.

## References

- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)


## Further architecture practice

- 1. Establish service boundaries · after B14. A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b14)
