# RW14 — API failure handling

Week 19 · Core · Warehouse checkpoint B19


## Review and learn

Timeouts, failure classification, bounded retries and user feedback.

## Do the work

Simulate a carrier acknowledgement timeout in a fixture and decide when retry is safe.

## Pass check

Verify no duplicate dispatch and an understandable retry or failure state.

## Further architecture practice

- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
