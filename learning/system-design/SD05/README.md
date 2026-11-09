<!-- Managed by export_warehouse_plan.py -->

# SD05 — Requirements

Week 5 · Core · Warehouse checkpoint [B05](../../projects/B05/README.md)

## Review and learn

Actors, use cases, constraints and measurable acceptance criteria.

## Do the work

Write requirements for receive, reserve, pick, dispatch and cancel. Rank the smallest end-to-end workflow.

## Pass check

Each core requirement has one success and one failure example.

## Read and practice

- Choose one reliability or performance question and answer it with a scenario and a check. [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

## Further architecture practice

- **1. Establish service boundaries.** A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split. Start after [B14](../../projects/B14/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 66. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Functional/non-functional, constraints, scale\
> Functional/non-functional requirements and constraints

### Exercise / interview prompt

> Design: Clarify a booking service\
> Trade-off: scope vs time

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd05)
