<!-- Managed by export_warehouse_plan.py -->

# SD17 — Replication

Week 16 · Core · Warehouse checkpoint B16


## Review and learn

Replication, lag, failover and authoritative reads.

## Do the work

Model a delayed replica read after a stock change. Decide which screens can accept stale data.

## Pass check

Trace stale availability and show how reservation avoids a stale read.

## References

- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)
- [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)
- [RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)


## Further architecture practice

- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.
- 5. Prove the distributed system can recover · after B20. Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd17)
