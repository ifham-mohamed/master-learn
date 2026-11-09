<!-- Managed by export_warehouse_plan.py -->

# SD07 — Data model

Week 5 · Core · Warehouse checkpoint [B05](../../projects/B05/README.md)

## Review and learn

Entities, relationships, lifecycle states and ownership.

## Do the work

Model a warehouse, SKU, balance, shipment, shipment lines, reservation and event history.

## Pass check

Walk through create, reserve, cancel and dispatch and reconcile both quantities and transitions.

## Read and practice

- Turn one business rule into a constraint and insert a deliberately invalid fixture. [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)

## Further architecture practice

- **1. Establish service boundaries.** A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split. Start after [B14](../../projects/B14/README.md).
- **3. Extract a Tracking microservice.** Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view. Start after [B20](../../projects/B20/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/) · [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 67. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> entities, keys, constraints\
> Endpoints, entities, invariants, constraints

### Exercise / interview prompt

> Design: POS order + inventory\
> Trade-off: normalization vs query speed

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd07)
