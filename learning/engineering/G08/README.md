<!-- Managed by export_warehouse_plan.py -->

# G08 — Rehearse deployment failure and recovery

Week 16 · Core · Warehouse checkpoint [B16](../../projects/B16/README.md)

Before you begin, complete [JA34](../../java-and-spring/JA34/README.md).

## Review and learn

Deployment rollback, database compatibility, smoke checks and restoration.

## Do the work

Deploy a deliberately bad change in staging or a local simulation. Restore service and verify old data.

## Pass check

Record time to recover, smoke output and the restore or rollback steps.

## Read and practice

- Repeat a clean build, restart and recovery check on your own project configuration. [Docker application tutorial](https://docs.docker.com/get-started/tutorials/run-an-app/)

## Further architecture practice

- **5. Prove the distributed system can recover.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow. Start after [B20](../../projects/B20/README.md).

[RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 175. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Deploy to a test environment, verify health checks, simulate a failed release, and demonstrate rollback or recovery with evidence.

### Exercise / interview prompt

The workbook leaves this cell blank.

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#g08)
