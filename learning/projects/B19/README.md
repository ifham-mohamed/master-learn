<!-- Managed by export_warehouse_plan.py -->

# B19 — Make dispatch safe to retry

Week 19 · Core · Warehouse checkpoint B19

Before you begin, complete B18.


## Review and learn

Idempotency, request identity, retry, and consistency under partial failure.

## Do the work

Make dispatch confirmation safe to retry. Compare bounded retry, outbox and offline failure options in small labs.

## Pass check

Identical replay has one effect, conflicting payload reuse is rejected and simulated failure recovers.

## References

- [Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)
- [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability)
- [Apache Kafka concepts](https://kafka.apache.org/documentation/)


## Further architecture practice

- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b19)
