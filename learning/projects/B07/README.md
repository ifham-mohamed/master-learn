<!-- Managed by export_warehouse_plan.py -->

# B07 — Connect React to the validated shipment API

Week 7 · Core · Warehouse checkpoint B07

Before you begin, complete [B06](../../projects/B06/README.md).

## Review and learn

REST contracts, input validation, response parsing and failure states.

## Do the work

Connect React to Spring for shipment create and lookup. Surface duplicate and validation failures.

## Pass check

Verify success, invalid input, conflict, malformed response, loading and failure states.

## Read and practice

- Transfer one constraint to the JSON API, then send an invalid request and inspect the response. [Spring input validation guide](https://spring.io/guides/gs/validating-form-input/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 85. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: CTEs/subqueries + advanced HTTP semantics\
> Design: Idempotency + pagination trade-offs\
> AI practice: AI-assisted small feature; write your own tests\
> Validated booking/order endpoint + Zod client contract\
> Pagination - Large orders list\
> Small assisted feature: add your own tests before acceptance

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b07)
