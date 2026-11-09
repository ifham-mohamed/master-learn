<!-- Managed by export_warehouse_plan.py -->

# B20 — Release, restore and verify the system

Week 20 · Core · Warehouse checkpoint B20

Before you begin, complete [B19](../../projects/B19/README.md).

## Review and learn

Deployment hardening, recovery, reliability targets and project explanation.

## Do the work

Release to staging, run the agreed smoke and load checks, then rehearse rollback and database restore.

## Pass check

Show a clean release, restored data, security results and a reviewer-ready walkthrough.

## Read and practice

- Repeat a clean build, restart and recovery check on your own project configuration. [Docker application tutorial](https://docs.docker.com/get-started/tutorials/run-an-app/)

## Further architecture practice

- **3. Extract a Tracking microservice.** Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view. Start after [B20](../../projects/B20/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/) · [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 205. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: Rapid full CS review\
> Design: Timed capstone design defense\
> AI practice: Dual-mode project review\
> Docker/CI/observability/security hardening + architecture one-pager + STAR/deep-dive stories\
> Timed system-design practice #4: use capstone/booking/commerce prompt\
> \-

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b20)
