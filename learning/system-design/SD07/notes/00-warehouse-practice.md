# SD07 — Data model

Week 5 · Core · Warehouse checkpoint B05


## Review and learn

Entities, relationships, lifecycle states and ownership.

## Do the work

Model a warehouse, SKU, balance, shipment, shipment lines, reservation and event history.

## Pass check

Walk through create, reserve, cancel and dispatch and reconcile both quantities and transitions.

## Further architecture practice

- 1. Establish service boundaries · after B14. A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.
- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
