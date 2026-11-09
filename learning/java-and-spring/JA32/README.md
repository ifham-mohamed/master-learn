<!-- Managed by export_warehouse_plan.py -->

# JA32 — Actuator / observability

Week 15 · Core · Warehouse checkpoint [B15](../../projects/B15/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Health versus readiness, correlation IDs, metrics and safe logging.

## Do the work

Add health/readiness checks and trace one failed reservation across HTTP and storage.

## Pass check

Find the request by ID. Logs expose useful context without credentials or private payloads.

## Read and practice

- Compare health output with a failed dependency and trace one request through the project. [Spring Boot Actuator guide](https://spring.io/guides/gs/actuator-service/)

## Further architecture practice

- **5. Prove the distributed system can recover.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow. Start after [B20](../../projects/B20/README.md).

[RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 157. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> health, metrics, logs, tracing concepts\
> logs/metrics/traces, identifiers\
> health, metrics, logs, tracing concepts, correlation IDs\
> Structured logs, metrics, tracing concept, correlation IDs\
> health, metrics, logs, traces, production diagnostics

### Exercise / interview prompt

> add health/metrics/log IDs\
> Interview: how diagnose slow endpoint?\
> Design: Debug failed checkout\
> Trade-off: cost vs visibility\
> Diagnose a production-like failure\
> Actuator + structured logs\
> Spring production readiness\
> Add health/metrics/log correlation

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja32)
