<!-- Managed by export_warehouse_plan.py -->

# RW11 — Refactoring

Week 14 · Core · Warehouse checkpoint [B14](../../projects/B14/README.md)

## Review and learn

Refactoring under tests, behavior preservation and clear boundaries.

## Do the work

Remove duplication in a shipment rule or form component after writing characterization tests.

## Pass check

The same tests pass before and after and the behavior of a failure case is preserved.

## Read and practice

- Use history and a small diff to explain one code path or justify a minimal change. [Pro Git](https://git-scm.com/book/en/v2)

## Further architecture practice

- **1. Establish service boundaries.** A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split. Start after [B14](../../projects/B14/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 152. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Small safe steps; tests stay green\
> Names, cohesion, duplication, interfaces, incremental refactors

### Exercise / interview prompt

> Improve design while preserving behavior\
> Practice mode: AI-free Yes, AI-assisted Yes

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#rw11)
