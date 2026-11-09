<!-- Managed by export_warehouse_plan.py -->

# JA17 — IoC / DI

Week 5 · Core · Warehouse checkpoint [B05](../../projects/B05/README.md)

Before you begin, complete [JA06](../../java-and-spring/JA06/README.md).

## Review and learn

Dependency injection, composition roots and test doubles.

## Do the work

Inject the existing shipment service and repository in Spring while keeping domain rules independent of HTTP.

## Pass check

A domain test runs without a server. Spring starts with the intended dependency.

## Read and practice

- Run a local endpoint and trace a request from the controller to the returned data. [Spring REST service guide](https://spring.io/guides/gs/rest-service/)

## Further architecture practice

- **1. Establish service boundaries.** A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split. Start after [B14](../../projects/B14/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 59. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> beans, constructor injection, component scanning, configuration\
> IoC/DI, beans, configuration, AOP concept, validation\
> Explain beans, constructor injection, configuration and testability

### Exercise / interview prompt

> 3-layer service without field injection\
> Interview: why constructor injection?\
> Explain constructor injection and bean lifecycle at high level\
> Small DI/service module\
> Foundation for Spring Boot\
> Build small layered service

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja17)
