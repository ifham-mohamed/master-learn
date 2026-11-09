<!-- Managed by export_warehouse_plan.py -->

# M31 — Architecture/trade-offs/security/testing/story

Week 20 · Core · Warehouse checkpoint [B20](../../projects/B20/README.md)

## Review and learn

Recall Architecture/trade-offs/security/testing/story and the assumptions that affect your answer.

## Do the work

Attempt a timed question on the topics in the task title unaided. Use an actual B20 artifact if it illustrates the topic, or create a small fixture.

## Pass check

Record time, result, both scores, one specific improvement, and an unaided retry.

## Read and practice

- Select a relevant topic and explain an actual project decision, an alternative and the evidence. [Amazon software development interview topics](https://amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics)
- Select a relevant question and answer it aloud before checking the notes. [Practice Bank](../../../sources/markdown/categories/practice-bank.md)

## Further architecture practice

- **3. Extract a Tracking microservice.** Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view. Start after [B20](../../projects/B20/README.md).

[Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/) · [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 207. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Complete the timed round. Record technical and communication scores, result, evidence, and one correction before the next mock.

### Exercise / interview prompt

The workbook leaves this cell blank.

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. In Learnspace, record technical and communication scores and the mock result. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/mock-interviews.md#m31)
