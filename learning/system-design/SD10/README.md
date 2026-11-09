<!-- Managed by export_warehouse_plan.py -->

# SD10 — Caching

Week 15 · Core · Warehouse checkpoint [B15](../../projects/B15/README.md)

## Review and learn

Cache keys, freshness and invalidation.

## Do the work

Try caching a read-only shipment summary after measuring its cost. Evaluate staleness after a write.

## Pass check

Show how data changes invalidate or expire the cache and why stock reservation reads remain authoritative.

## Read and practice

- Measure the existing lookup on a representative fixture before adding a cache or search component. [PostgreSQL query plan tutorial](https://www.postgresql.org/docs/current/using-explain.html)

## Further architecture practice

- **5. Prove the distributed system can recover.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow. Start after [B20](../../projects/B20/README.md).

[RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 161. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> what/where/how invalidate\
> cache-aside, TTL, sessions, rate limits, invalidation\
> Cache-aside, TTL, invalidation, rate-limit/session patterns\
> Cache-aside, invalidation, TTL, stale-data trade-offs

### Exercise / interview prompt

> Design: Product catalogue cache\
> Trade-off: freshness vs latency\
> Add cache with explicit invalidation rule\
> Cache catalogue endpoint\
> Optional but useful

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd10)
