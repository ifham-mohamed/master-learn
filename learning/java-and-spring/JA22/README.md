<!-- Managed by export_warehouse_plan.py -->

# JA22 — REST correctness

Week 7 · Core · Warehouse checkpoint [B07](../../projects/B07/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

HTTP methods, status codes, safe reads and repeatable requests.

## Do the work

Write the API contract for shipment create, detail and reservation. Decide how clients find a newly created record.

## Pass check

Test success, missing resource, invalid input and a reservation conflict against the contract.

## Read and practice

- Sketch one operation with success and failure responses, then verify both against a real or stubbed endpoint. [OpenAPI overview](https://www.openapis.org/what-is-openapi)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 82. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> methods, status codes, pagination, idempotency\
> resources, methods, idempotency, errors\
> offset vs cursor\
> Resources, verbs, status codes, pagination, versioning, idempotency

### Exercise / interview prompt

> order + booking API\
> Interview: PUT vs PATCH? 201 vs 204?\
> Design: Order API\
> Trade-off: simplicity vs flexibility\
> Design: Large orders list\
> Trade-off: simplicity vs consistency

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja22)
