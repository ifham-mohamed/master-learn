# B19 — Add idempotency/concurrency protection, retry/queue/cache/offline design evidence

Week 19 · Core · Warehouse checkpoint B19

## Review and learn

Idempotency, request identity, retry, and consistency under partial failure.

## Do the work

Make dispatch confirmation safe to retry. Compare bounded retry, outbox and offline failure options in small labs.

## Pass check

Identical replay has one effect, conflicting payload reuse is rejected and simulated failure recovers.

Write the implementation and checks yourself. Use documentation, the debugger and actual runs. Save what you ran, what happened, and your next action in [Results](../results/evidence.md) or record it in Learnspace. Include a commit or result path when useful.
