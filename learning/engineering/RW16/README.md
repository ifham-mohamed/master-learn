<!-- Managed by export_warehouse_plan.py -->

# RW16 — Performance investigation

Week 15 · Core · Warehouse checkpoint B15


## Review and learn

Baseline measurement, representative load and bottleneck isolation.

## Do the work

Measure one slow query or render on identical fixtures and isolate its cause.

## Pass check

Save the baseline, measurement method and repeatable result after one change.

## References

- [RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)


## Further architecture practice

- 5. Prove the distributed system can recover · after B20. Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow.
- 6. Measure algorithms against warehouse workloads · after B10. Save a baseline, input size, edge cases and measured costs. Explain which structures belong in the main application and which remain interview or design exercises.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#rw16)
