<!-- Managed by export_warehouse_plan.py -->

# AI05 — AI limitations, context and token budgets

Week 5 · Core · Warehouse checkpoint [B05](../../projects/B05/README.md)

## Review and learn

Context limits, incomplete specifications and plausible but wrong suggestions.

## Do the work

Compare two supplied descriptions of a warehouse rule and identify missing context. Write the correct test yourself.

## Pass check

Show which assumption changes the expected result and verify it without an AI tool.

## Read and practice

- Write one observable failure case and test it with a synthetic fixture or a stubbed action. [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 55. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Context limits, cost/latency, truncation\
> Hallucination, stale assumptions, non-determinism\
> Models, tokens, context, latency/cost, failure handling

### Exercise / interview prompt

> Estimate context needed for repo task\
> Failure to test: Missing/irrelevant context\
> Find unsupported claim/code assumption\
> Failure to test: Blind trust

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/ai-engineering.md#ai05)
