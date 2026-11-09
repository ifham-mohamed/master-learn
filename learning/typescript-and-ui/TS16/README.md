<!-- Managed by export_warehouse_plan.py -->

# TS16 — Runtime validation

Week 7 · Core · Warehouse checkpoint [B07](../../projects/B07/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Runtime validation, unknown input and response parsing.

## Do the work

Validate a real shipment API response before handing it to the UI.

## Pass check

A malformed response shows a useful error instead of rendering invalid data.

## Read and practice

- Parse a valid response and a malformed response before either reaches the UI state. [Zod basic usage](https://zod.dev/basics)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 83. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> types disappear at runtime; validate external JSON\
> Jakarta Bean Validation + DTO validation; Zod/runtime validation in TS\
> Schema validation, typed DTOs, backward compatibility

### Exercise / interview prompt

> Zod schema for Spring API DTO\
> Interview: why TS types do not secure API input?\
> Reject malformed input consistently across both stacks\
> Shared API contract examples\
> Know compile-time vs runtime validation

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts16)
