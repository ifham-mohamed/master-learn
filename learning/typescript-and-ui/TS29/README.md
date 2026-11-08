<!-- Managed by export_warehouse_plan.py -->

# TS29 — Spring Boot contract

Week 18 · Core · Warehouse checkpoint B18

Before you begin, complete JA22, TS21.


## Review and learn

DTO compatibility, stable errors and contract testing.

## Do the work

Make one backwards-compatible change to the Spring shipment response and exercise the typed client.

## Pass check

A documented contract test covers valid, malformed and earlier response shapes as applicable.

## References

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)
- [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)


## Further architecture practice

- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts29)
