<!-- Managed by export_warehouse_plan.py -->

# B18 — Build the delivery and exception workflow

Week 18 · Core · Warehouse checkpoint B18

Before you begin, complete [B17](../../projects/B17/README.md).

## Review and learn

Vertical feature delivery, contract tests and domain events.

## Do the work

Implement the approved exception and delivery flow across React, Spring and PostgreSQL.

## Pass check

Verify authorized actions, invalid transitions, ordered event history and accessible feedback.

## Read and practice

- Sketch one operation with success and failure responses, then verify both against a real or stubbed endpoint. [OpenAPI overview](https://www.openapis.org/what-is-openapi)

## Further architecture practice

- **3. Extract a Tracking microservice.** Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view. Start after [B20](../../projects/B20/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/) · [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 189. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: Target weak fundamentals\
> Design: Timed system design #2\
> AI practice: AI-assisted feature allowed; independently verify\
> Implement core Spring endpoints + TypeScript client + integration tests\
> Timed system-design practice #2: use capstone/booking/commerce prompt\
> \-

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b18)
