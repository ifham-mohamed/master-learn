<!-- Managed by export_warehouse_plan.py -->

# JA17 — IoC / DI

Week 5 · Core · Warehouse checkpoint B05

Before you begin, complete JA06.


## Review and learn

Dependency injection, composition roots and test doubles.

## Do the work

Inject the existing shipment service and repository in Spring while keeping domain rules independent of HTTP.

## Pass check

A domain test runs without a server. Spring starts with the intended dependency.

## References

- [Spring guides by topic](https://spring.io/guides)
- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)


## Further architecture practice

- 1. Establish service boundaries · after B14. A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja17)
