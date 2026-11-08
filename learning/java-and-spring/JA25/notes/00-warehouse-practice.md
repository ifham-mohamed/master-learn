# JA25 — Transactions

Week 10 · Core · Warehouse checkpoint B10

Before you begin, complete JA23.


## Review and learn

Atomicity, transaction boundaries and rollback behavior.

## Do the work

Reserve all lines and update shipment state in one transaction. Inject a failure after the first line.

## Pass check

After failure, balances, reservations and shipment state are unchanged.

## Further architecture practice

- 1. Establish service boundaries · after B14. A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.
- 2. Publish dispatch events through RabbitMQ · after B19. Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.

Write the work yourself. Save the command or scenario, actual result, and next action in [Results](../results/evidence.md) or in Learnspace. Include a commit or result path when useful.
