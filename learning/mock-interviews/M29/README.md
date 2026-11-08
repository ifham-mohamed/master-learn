<!-- Managed by export_warehouse_plan.py -->

# M29 — Queues/retries/idempotency/offline sync

Week 19 · Core · Warehouse checkpoint B19


## Review and learn

Recall Queues/retries/idempotency/offline sync and the assumptions that affect your answer.

## Do the work

Attempt the original timed prompt unaided. Use an actual B19 artifact if it illustrates the topic, or a self-contained fixture when it does not.

## Pass check

Record time, result, both scores, one specific improvement, and an unaided retry.

## References

- [Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)
- [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability)
- [Apache Kafka concepts](https://kafka.apache.org/documentation/)


## Further architecture practice

- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. In Learnspace, record technical and communication scores and the mock result. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/mock-interviews.md#m29)
