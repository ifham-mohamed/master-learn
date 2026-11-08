<!-- Managed by export_warehouse_plan.py -->

# M31 — Architecture/trade-offs/security/testing/story

Week 20 · Core · Warehouse checkpoint B20


## Review and learn

Recall Architecture/trade-offs/security/testing/story and the assumptions that affect your answer.

## Do the work

Attempt the original timed prompt unaided. Use an actual B20 artifact if it illustrates the topic, or a self-contained fixture when it does not.

## Pass check

Record time, result, both scores, one specific improvement, and an unaided retry.

## References

- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)
- [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)


## Further architecture practice

- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.



## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. In Learnspace, record technical and communication scores and the mock result. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/mock-interviews.md#m31)
