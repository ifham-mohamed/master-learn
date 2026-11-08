# B19 — Make dispatch safe to retry

Week 19 · Core · Warehouse checkpoint B19

Before you begin, complete B18.


## Review and learn

Idempotency, request identity, retry, and consistency under partial failure.

## Do the work

Make dispatch confirmation safe to retry. Compare bounded retry, outbox and offline failure options in small labs.

## Pass check

Identical replay has one effect, conflicting payload reuse is rejected and simulated failure recovers.

## Further architecture practice

- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
