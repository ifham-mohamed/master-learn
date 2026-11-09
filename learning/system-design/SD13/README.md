<!-- Managed by export_warehouse_plan.py -->

# SD13 — Queues, retries and service reliability

Week 14 · Core · Warehouse checkpoint [B14](../../projects/B14/README.md)

## Review and learn

Queues, delivery semantics, outbox and bounded retries.

## Do the work

Simulate a delayed dispatch notification with a stub worker and a duplicate delivery.

## Pass check

The subscriber handles a replay safely and you can explain recovery after a failed send.

## Read and practice

- Try the work queue tutorial in an isolated lab. Then test duplicate delivery using your own handler. [RabbitMQ hands-on tutorials](https://www.rabbitmq.com/tutorials)

## Further architecture practice

- **2. Publish dispatch events through RabbitMQ.** Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery. Start after [B19](../../projects/B19/README.md).
- **3. Extract a Tracking microservice.** Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view. Start after [B20](../../projects/B20/README.md).

[Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) · [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability) · [Apache Kafka concepts](https://kafka.apache.org/documentation/) · [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/) · [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 153. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> async jobs, retries, idempotent consumers\
> timeouts, retry, circuit breaker concept\
> Signatures, retries, idempotency, ordering\
> Retries, dead-letter, at-least-once, idempotent consumers\
> When/why to decouple, retries, idempotency\
> Timeouts, retries, circuit-breaker concept, graceful degradation

### Exercise / interview prompt

> Design: Email/payment webhook processing\
> Trade-off: latency vs decoupling\
> Design: Unreliable payment provider\
> Trade-off: resilience vs duplicate risk

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd13)
