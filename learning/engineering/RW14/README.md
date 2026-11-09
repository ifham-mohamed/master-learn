<!-- Managed by export_warehouse_plan.py -->

# RW14 — API failure handling

Week 19 · Core · Warehouse checkpoint [B19](../../projects/B19/README.md)

## Review and learn

Timeouts, failure classification, bounded retries and user feedback.

## Do the work

Simulate a carrier acknowledgement timeout in a fixture and decide when retry is safe.

## Pass check

Verify no duplicate dispatch and an understandable retry or failure state.

## Read and practice

- Classify one transient failure and show the result after retries stop. [AWS timeouts, retries and backoff](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)

## Further architecture practice

- **2. Publish dispatch events through RabbitMQ.** Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery. Start after [B19](../../projects/B19/README.md).

[Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) · [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability) · [Apache Kafka concepts](https://kafka.apache.org/documentation/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 198. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> No duplicate side effects; clear error path

### Exercise / interview prompt

> Handle timeout/5xx/retry safely\
> Practice mode: AI-free Yes, AI-assisted Yes

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#rw14)
