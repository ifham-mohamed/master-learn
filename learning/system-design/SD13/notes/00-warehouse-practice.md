# SD13 — Queues, retries and service reliability

Week 14 · Core · Warehouse checkpoint B14


## Review and learn

Queues, delivery semantics, outbox and bounded retries.

## Do the work

Simulate a delayed dispatch notification with a stub worker and a duplicate delivery.

## Pass check

The subscriber handles a replay safely and you can explain recovery after a failed send.

## Further architecture practice

- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.
- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
