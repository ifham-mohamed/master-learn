<!-- Managed by export_warehouse_plan.py -->

# JA32 — Actuator / observability

Week 15 · Core · Warehouse checkpoint B15

Before you begin, complete G02.


## Review and learn

Health versus readiness, correlation IDs, metrics and safe logging.

## Do the work

Add health/readiness checks and trace one failed reservation across HTTP and storage.

## Pass check

Find the request by ID. Logs expose useful context without credentials or private payloads.

## References

- [Spring guides by topic](https://spring.io/guides)
- [RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)


## Further architecture practice

- 5. Prove the distributed system can recover · after B20. Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja32)
