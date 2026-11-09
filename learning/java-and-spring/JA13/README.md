<!-- Managed by export_warehouse_plan.py -->

# JA13 — Records / sealed classes

Week 4 · Core · Warehouse checkpoint [B04](../../projects/B04/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Records for immutable data and sealed types for a closed set of cases.

## Do the work

Model a shipment summary as a record. Try a closed result type for accepted and refused reservation in a small exercise.

## Pass check

Map the result cases explicitly and explain which object must still manage mutable state.

## Read and practice

- Try a shipment summary record and identify which properties can still hold mutable objects. [Dev.java records guide](https://dev.java/learn/language/oop/records/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 45. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> concise immutable carriers; constrained hierarchies\
> records, sealed classes, pattern matching concepts, switch expressions

### Exercise / interview prompt

> DTO/value object refactor\
> Interview: record vs class?\
> Use records for DTO/value objects

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja13)
