<!-- Managed by export_warehouse_plan.py -->

# AI09 — Bounded agents, tool calls and context

Week 16 · Optional · Warehouse checkpoint [B16](../../projects/B16/README.md)

## Review and learn

Optional bounded tools, least privilege and validation.

## Do the work

Use a fake action runner to simulate read-only shipment lookup and a forbidden dispatch action.

## Pass check

Record which action was allowed, why the other failed and the test that proves it.

## Read and practice

- Write one observable failure case and test it with a synthetic fixture or a stubbed action. [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 166. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Schema, permissions, tool-result loop\
> Plan/act/observe, stop conditions\
> Repo map, acceptance criteria, constraints\
> Clear plan, controlled scope\
> Task, constraints, examples, context boundaries\
> Define tools, permissions, validation, error loops\
> Plan/act/observe, tool use, boundaries, human review

### Exercise / interview prompt

> Agent can read but not mutate unsafe resources\
> Failure to test: Over-privileged tools\
> Give bounded repo ticket\
> Failure to test: Infinite/unsafe loops\
> Improve agent output without overprompting\
> Failure to test: Ambiguous scope\
> Give agent bounded ticket with context + acceptance criteria\
> Practice mode: AI-free No, AI-assisted Yes

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/ai-engineering.md#ai09)
