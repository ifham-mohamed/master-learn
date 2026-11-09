<!-- Managed by export_warehouse_plan.py -->

# SD17 — Replication

Week 16 · Core · Warehouse checkpoint [B16](../../projects/B16/README.md)

## Review and learn

Replication, lag, failover and authoritative reads.

## Do the work

Model a delayed replica read after a stock change. Decide which screens can accept stale data.

## Pass check

Trace stale availability and show how reservation avoids a stale read.

## Read and practice

- Trace a read during replica lag and identify the operation that must reach the primary. [PostgreSQL standby servers](https://www.postgresql.org/docs/current/warm-standby.html)

## Further architecture practice

- **3. Extract a Tracking microservice.** Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view. Start after [B20](../../projects/B20/README.md).
- **5. Prove the distributed system can recover.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow. Start after [B20](../../projects/B20/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/) · [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html) · [RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 179. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> read scale / failover concept

### Exercise / interview prompt

> Design: Read-heavy catalogue\
> Trade-off: consistency lag

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd17)
