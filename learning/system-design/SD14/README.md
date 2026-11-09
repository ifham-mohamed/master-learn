<!-- Managed by export_warehouse_plan.py -->

# SD14 — Rate limiting

Week 16 · Core · Warehouse checkpoint [B16](../../projects/B16/README.md)

## Review and learn

Rate limits, burst behavior, client identity and HTTP 429.

## Do the work

Exercise independent login and API limits in staging or a local simulation.

## Pass check

Show burst rejection, isolated callers and recovery after the limit resets.

## Read and practice

- Send a controlled burst and inspect the rejection and retry information. [MDN HTTP 429 reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429)

## Further architecture practice

- **5. Prove the distributed system can recover.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow. Start after [B20](../../projects/B20/README.md).

[RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 176. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> per key/window algorithms concept\
> Token bucket concept, per-user/IP policies, backoff

### Exercise / interview prompt

> Design: Public API protection\
> Trade-off: fairness vs simplicity

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd14)
