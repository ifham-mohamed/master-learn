<!-- Managed by export_warehouse_plan.py -->

# AI14 — Verify generated code with tests and diff review

Week 16 · Core · Warehouse checkpoint [B16](../../projects/B16/README.md)

## Review and learn

Human review, counterexamples and regression verification.

## Do the work

Inspect a prepared patch for a stock rule. Reject or correct it with a test you write independently.

## Pass check

One targeted case detects the defect and passes after the fix.

## Read and practice

- Review a prepared diff yourself and write the regression test for one defect you can reproduce. [GitHub pull request docs](https://docs.github.com/en/pull-requests)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 167. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Correctness, edge cases, security, perf\
> Use targeted tests to prove AI fix\
> Small diffs, inspect changed files, revert noise\
> Catch correctness/security/test gaps\
> agent context, small diffs, tests, compile/type checks, security review\
> Review generated code, test security/perf/correctness

### Exercise / interview prompt

> Review AI PR line-by-line\
> Failure to test: Almost-right code\
> Write regression before acceptance\
> Failure to test: False confidence\
> Reduce an over-broad AI change\
> Failure to test: Unnecessary rewrites\
> Ask an agent to implement, then independently review it\
> Practice mode: AI-free No, AI-assisted Yes\
> Use AI on repo task then independently verify Java + TS changes\
> 5 timed agentic tickets\
> Use AI only when interview policy permits

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/ai-engineering.md#ai14)
