<!-- Managed by export_warehouse_plan.py -->

# SD16 — Load balancing

Week 16 · Core · Warehouse checkpoint B16


## Review and learn

Load balancing, health checks and session behavior.

## Do the work

Simulate routing to two app instances and failing one health check.

## Pass check

Explain which requests recover and how session state behaves across instances.

## References

- [RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)


## Further architecture practice

- 5. Prove the distributed system can recover · after B20. Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd16)
