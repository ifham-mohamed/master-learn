<!-- Managed by export_warehouse_plan.py -->

# RW11 — Refactoring

Week 14 · Core · Warehouse checkpoint B14


## Review and learn

Refactoring under tests, behavior preservation and clear boundaries.

## Do the work

Remove duplication in a shipment rule or form component after writing characterization tests.

## Pass check

The same tests pass before and after and the behavior of a failure case is preserved.

## References

- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)


## Further architecture practice

- 1. Establish service boundaries · after B14. A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#rw11)
