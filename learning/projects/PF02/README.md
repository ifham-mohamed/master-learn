<!-- Managed by export_warehouse_plan.py -->

# PF02 — Warehouse reservation concurrency lab

Week 12 · Optional · Warehouse checkpoint [B12](../../projects/B12/README.md)

Before you begin, complete [B12](../../projects/B12/README.md).

## Review and learn

Optional concurrency comparison and invariant testing.

## Do the work

Package the last-unit race as a small standalone experiment. Compare it with a dock-slot overlap example if useful.

## Pass check

Show the race and safe outcome on repeat runs.

## Read and practice

- Open two sessions and record which statement blocks, commits or rolls back. [PostgreSQL explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 136. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Evidence: Concurrency integration tests\
> Security: Authorization/input validation\
> Reliability: Idempotency + retries\
> Write a 2-minute story and a project deep dive with your own contribution, defect, trade-off and measured result.

### Exercise / interview prompt

> Source status: Recommended extension\
> Contribution: Solo\
> Bug: Race between two bookings\
> Trade-off: Constraint vs lock vs optimistic approach\
> Build a small reproducible module

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#pf02)
