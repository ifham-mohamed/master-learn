<!-- Managed by export_warehouse_plan.py -->

# RW14 — API failure handling

Week 19 · Core · Warehouse checkpoint B19


## Review and learn

Timeouts, failure classification, bounded retries and user feedback.

## Do the work

Simulate a carrier acknowledgement timeout in a fixture and decide when retry is safe.

## Pass check

Verify no duplicate dispatch and an understandable retry or failure state.

## References

- [Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)
- [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability)
- [Apache Kafka concepts](https://kafka.apache.org/documentation/)


## Further architecture practice

- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#rw14)
