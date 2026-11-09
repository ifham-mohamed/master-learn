<!-- Managed by export_warehouse_plan.py -->

# JA08 — Collections

Week 2 · Core · Warehouse checkpoint [B02](../../projects/B02/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

List, Set and Map, deterministic iteration, and lookup cost.

## Do the work

Support multiple shipments and look up by reference. Compare a list scan with a keyed map for the same fixture.

## Pass check

Preserve all valid shipments, reject duplicate keys and explain complexity with a trace.

## Read and practice

- Predict the output of your own small collection or stream fixture, then run it. [Dev.java collections and streams](https://dev.java/learn/api/collections-and-streams/)

## Further architecture practice

- **6. Measure algorithms against warehouse workloads.** Save a baseline, input size, edge cases and measured costs. Explain which structures belong in the main application and which remain interview or design exercises. Start after [B10](../../projects/B10/README.md).

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 23. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> List/Set/Map/Queue, implementations, complexity\
> Choose List/Set/Map/Queue; generics bounds; equality/hashCode

### Exercise / interview prompt

> collection selection drills\
> Interview: ArrayList vs LinkedList? HashMap internals high level?\
> Implement domain collections exercises

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja08)
