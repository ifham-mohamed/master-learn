<!-- Managed by export_warehouse_plan.py -->

# JA21 — Validation + errors

Week 7 · Core · Warehouse checkpoint [B07](../../projects/B07/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Boundary validation, domain errors and consistent problem responses.

## Do the work

Validate quantity and required fields, and map duplicate and invalid transition failures to stable responses.

## Pass check

Bad input and conflicts have distinct responses and no stack trace or partial write.

## Read and practice

- Transfer one constraint to the JSON API, then send an invalid request and inspect the response. [Spring input validation guide](https://spring.io/guides/gs/validating-form-input/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 81. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Bean Validation, global exception handling, stable error model

### Exercise / interview prompt

> validation + error response tests\
> Interview: how validate API input?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja21)
