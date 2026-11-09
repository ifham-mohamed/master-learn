<!-- Managed by export_warehouse_plan.py -->

# JA25 — Transactions

Week 10 · Core · Warehouse checkpoint [B10](../../projects/B10/README.md)

Before you begin, complete [JA23](../../java-and-spring/JA23/README.md).

## Review and learn

Atomicity, transaction boundaries and rollback behavior.

## Do the work

Reserve all lines and update shipment state in one transaction. Inject a failure after the first line.

## Pass check

After failure, balances, reservations and shipment state are unchanged.

## Read and practice

- Identify the service boundary and prove rollback after a partial write. [Spring Data JPA transaction boundaries](https://docs.spring.io/spring-data/jpa/reference/jpa/transactions.html)

## Further architecture practice

- **1. Establish service boundaries.** A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split. Start after [B14](../../projects/B14/README.md).
- **2. Publish dispatch events through RabbitMQ.** Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery. Start after [B19](../../projects/B19/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/) · [Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) · [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability) · [Apache Kafka concepts](https://kafka.apache.org/documentation/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 111. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> @Transactional boundaries, rollback, read-only, isolation concept\
> multi-step atomic changes\
> Use @Transactional, understand boundaries, rollback and propagation basics

### Exercise / interview prompt

> payment/order rollback lab\
> Interview: where should transaction boundary live?\
> Design: Checkout + inventory decrement\
> Trade-off: consistency vs throughput\
> Build rollback + concurrency tests

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja25)
