<!-- Managed by export_warehouse_plan.py -->

# B18 — Build the delivery and exception workflow

Week 18 · Core · Warehouse checkpoint B18

Before you begin, complete B17.


## Review and learn

Vertical feature delivery, contract tests and domain events.

## Do the work

Implement the approved exception and delivery flow across React, Spring and PostgreSQL.

## Pass check

Verify authorized actions, invalid transitions, ordered event history and accessible feedback.

## References

- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)
- [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)


## Further architecture practice

- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b18)
