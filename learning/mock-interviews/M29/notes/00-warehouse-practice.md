# M29 — Queues/retries/idempotency/offline sync

Week 19 · Core · Warehouse checkpoint B19


## Review and learn

Recall Queues/retries/idempotency/offline sync and the assumptions that affect your answer.

## Do the work

Attempt the original timed prompt unaided. Use an actual B19 artifact if it illustrates the topic, or a self-contained fixture when it does not.

## Pass check

Record time, result, both scores, one specific improvement, and an unaided retry.

## Further architecture practice

- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.

Write the work yourself. Save the command or scenario, actual result, and next action in [Results](../results/evidence.md) or in Learnspace. Include a commit or result path when useful.
