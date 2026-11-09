<!-- Managed by export_warehouse_plan.py -->

# TS29 — Spring Boot contract

Week 18 · Core · Warehouse checkpoint [B18](../../projects/B18/README.md)

Before you begin, complete [JA22](../../java-and-spring/JA22/README.md), [TS21](../../typescript-and-ui/TS21/README.md).

## Review and learn

DTO compatibility, stable errors and contract testing.

## Do the work

Make one backwards-compatible change to the Spring shipment response and exercise the typed client.

## Pass check

A documented contract test covers valid, malformed and earlier response shapes as applicable.

## Read and practice

- Sketch one operation with success and failure responses, then verify both against a real or stubbed endpoint. [OpenAPI overview](https://www.openapis.org/what-is-openapi)

## Further architecture practice

- **3. Extract a Tracking microservice.** Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view. Start after [B20](../../projects/B20/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/) · [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 188. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> HTTP types, error shapes, auth, pagination, versioning\
> type props/forms/API responses; server/client boundaries; error states

### Exercise / interview prompt

> end-to-end dual-stack feature\
> Interview: how keep Java DTO and TS client aligned?\
> Connect Next.js UI to Spring Boot API

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts29)
