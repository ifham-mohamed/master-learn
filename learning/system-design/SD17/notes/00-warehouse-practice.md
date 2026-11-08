# SD17 — Replication

Week 16 · Core · Warehouse checkpoint B16


## Review and learn

Replication, lag, failover and authoritative reads.

## Do the work

Model a delayed replica read after a stock change. Decide which screens can accept stale data.

## Pass check

Trace stale availability and show how reservation avoids a stale read.

## Further architecture practice

- 3. Extract a Tracking microservice · after B20. Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.
- 5. Prove the distributed system can recover · after B20. Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
