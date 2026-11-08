<!-- Managed by export_warehouse_plan.py -->

# B20 — Release, restore and verify the system

Week 20 · Core · Warehouse checkpoint B20

Before you begin, complete B19.


## Review and learn

Deployment hardening, recovery, reliability targets and project explanation.

## Do the work

Release to staging, run the agreed smoke and load checks, then rehearse rollback and database restore.

## Pass check

Show a clean release, restored data, security results and a reviewer-ready walkthrough.

## References

- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)
- [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)


## Further architecture practice

- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b20)
