<!-- Managed by export_warehouse_plan.py -->

# JA25 — Transactions

Week 10 · Core · Warehouse checkpoint B10

Before you begin, complete JA23.


## Review and learn

Atomicity, transaction boundaries and rollback behavior.

## Do the work

Reserve all lines and update shipment state in one transaction. Inject a failure after the first line.

## Pass check

After failure, balances, reservations and shipment state are unchanged.

## References

- [Spring guides by topic](https://spring.io/guides)
- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)
- [Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)
- [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability)
- [Apache Kafka concepts](https://kafka.apache.org/documentation/)


## Further architecture practice

- 1. Establish service boundaries · after B14. A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.
- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja25)
