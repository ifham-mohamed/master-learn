<!-- Managed by export_warehouse_plan.py -->

# RW16 — Performance investigation

Week 15 · Core · Warehouse checkpoint [B15](../../projects/B15/README.md)

## Review and learn

Baseline measurement, representative load and bottleneck isolation.

## Do the work

Measure one slow query or render on identical fixtures and isolate its cause.

## Pass check

Save the baseline, measurement method and repeatable result after one change.

## Read and practice

- Compare plans for the same fixture and explain the observed scan, join or sort. [PostgreSQL EXPLAIN tutorial](https://www.postgresql.org/docs/current/using-explain.html)

## Further architecture practice

- **5. Prove the distributed system can recover.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow. Start after [B20](../../projects/B20/README.md).
- **6. Measure algorithms against warehouse workloads.** Save a baseline, input size, edge cases and measured costs. Explain which structures belong in the main application and which remain interview or design exercises. Start after [B10](../../projects/B10/README.md).

[RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 160. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Measure before/after; justify change

### Exercise / interview prompt

> Identify N+1/query/index/bundle bottleneck\
> Practice mode: AI-free Yes, AI-assisted Yes

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#rw16)
