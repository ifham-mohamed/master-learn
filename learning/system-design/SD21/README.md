<!-- Managed by export_warehouse_plan.py -->

# SD21 — Offline sync

Week 19 · Core · Warehouse checkpoint [B19](../../projects/B19/README.md)

## Review and learn

Offline work, conflict detection, versions and replay.

## Do the work

Design an offline pick draft and simulate a conflict on reconnect.

## Pass check

Show the conflict outcome and explain which operations require authoritative online stock checks.

## Read and practice

- Use an offline simulation and verify a conflict when a draft is submitted after reconnecting. [MDN offline and background operation guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)

## Further architecture practice

- **5. Prove the distributed system can recover.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow. Start after [B20](../../projects/B20/README.md).

[RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 199. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> queue/replay/conflict/idempotency

### Exercise / interview prompt

> Design: Offline POS transaction replay\
> Trade-off: availability vs consistency

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd21)
