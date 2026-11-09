<!-- Managed by export_warehouse_plan.py -->

# JA07 — equals/hashCode/immutability

Week 2 · Core · Warehouse checkpoint [B02](../../projects/B02/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Value equality, hash codes and immutable identifiers.

## Do the work

Make SKU or shipment reference an immutable value. Use it to look up a record created from a separate but equal value.

## Pass check

Equal values share a hash and resolve the same map entry. An unrelated value does not match.

## Read and practice

- Review the relevant language feature and trace what a shipment object can expose or change. [Dev.java object-oriented programming](https://dev.java/learn/language/oop/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 22. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> identity vs equality, hash contracts, immutable value objects

### Exercise / interview prompt

> value object kata\
> Interview: why can HashMap fail with bad hashCode?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja07)
