<!-- Managed by export_warehouse_plan.py -->

# JA20 — Spring MVC

Week 6 · Core · Warehouse checkpoint [B06](../../projects/B06/README.md)

Before you begin, complete [JA18](../../java-and-spring/JA18/README.md).

## Review and learn

Controllers, DTOs, request binding and service boundaries.

## Do the work

Add create and lookup operations for shipments. Keep request parsing and business decisions in their respective layers.

## Pass check

A terminal HTTP client can create and read a shipment. A controller test covers binding failure.

## Read and practice

- Run a local endpoint and trace a request from the controller to the returned data. [Spring REST service guide](https://spring.io/guides/gs/rest-service/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 72. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> controllers, request mapping, DTOs, serialization\
> controllers, DTOs, status codes, pagination, exception handling\
> DTOs, validation, status codes, pagination, exception handling

### Exercise / interview prompt

> CRUD/order endpoints\
> Interview: controller vs service responsibility?\
> Design and implement booking/order API\
> REST API with OpenAPI contract\
> Core backend interview area\
> Build order/booking endpoints

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja20)
