<!-- Managed by export_warehouse_plan.py -->

# RW06 — Reproduce, diagnose and repair a defect with regression tests

Week 9 · Core · Warehouse checkpoint [B09](../../projects/B09/README.md)

## Review and learn

Reproduction, debugging, minimal fixes and regression tests.

## Do the work

Reproduce a shipment list or input failure, write the smallest failing case, and fix it yourself.

## Pass check

Save the failing case, root cause, passing test and scope of the change.

## Read and practice

- Compare the boundaries of a service test and a web test. Pick the narrowest test that catches your failure. [Spring web testing guide](https://spring.io/guides/gs/testing-web/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 104. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Can reproduce before changing code\
> Hypothesis to isolate to prove\
> Correctness + regression protection\
> Meaningful coverage\
> Reproduce, logs, hypothesis, isolate, fix, verify

### Exercise / interview prompt

> Given a failing behavior, create minimal reproducible case\
> Practice mode: AI-free Yes, AI-assisted Yes\
> Find root cause from stack trace + logs\
> Fix implementation without weakening the test\
> Add normal, boundary, invalid and failure tests

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#rw06)
