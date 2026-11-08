<!-- Managed by export_warehouse_plan.py -->

# SD13 — Queues, retries and service reliability

Week 14 · Core · Warehouse checkpoint B14


## Review and learn

Queues, delivery semantics, outbox and bounded retries.

## Do the work

Simulate a delayed dispatch notification with a stub worker and a duplicate delivery.

## Pass check

The subscriber handles a replay safely and you can explain recovery after a failed send.

## References

- [Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)
- [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability)
- [Apache Kafka concepts](https://kafka.apache.org/documentation/)
- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)
- [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)


## Further architecture practice

- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.
- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd13)
