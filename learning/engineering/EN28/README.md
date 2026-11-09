<!-- Managed by export_warehouse_plan.py -->

# EN28 — CI/CD

Week 14 · Core · Warehouse checkpoint [B14](../../projects/B14/README.md)

## Review and learn

CI checks, artifacts, deployment stages and reproducibility.

## Do the work

Run backend, frontend and integration checks in CI. Fail a practice branch deliberately.

## Pass check

CI blocks the broken revision and publishes a successful verification result.

## Read and practice

- Run a workflow in the exercise before adding one repeatable check to your project CI. [GitHub Skills Actions course](https://github.com/skills/hello-github-actions)

## Further architecture practice

- **5. Prove the distributed system can recover.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow. Start after [B20](../../projects/B20/README.md).

[RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 149. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> lint/test/build/security/deploy gates\
> Build/test/lint/deploy pipeline, quality gates

### Exercise / interview prompt

> Create PR pipeline for Java + TypeScript\
> GitHub Actions pipeline\
> Shared

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#en28)
