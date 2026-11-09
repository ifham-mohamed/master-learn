<!-- Managed by export_warehouse_plan.py -->

# JA15 — Virtual threads concept

Week 16 · Optional · Warehouse checkpoint [B16](../../projects/B16/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Virtual threads, blocking I/O and downstream resource limits.

## Do the work

Compare two executor models on the same synthetic blocking task as an optional lab.

## Pass check

Record throughput and resource assumptions. Explain why database connection limits still apply.

## Read and practice

- Run the same small blocking fixture with both executors and record the concurrency limit downstream. [Dev.java virtual threads guide](https://dev.java/learn/api/virtual-threads/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 169. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> why lightweight blocking concurrency can help I/O workloads

### Exercise / interview prompt

> small I/O benchmark/read-up\
> Interview: platform vs virtual thread high-level

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja15)
