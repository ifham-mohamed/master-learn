<!-- Managed by export_warehouse_plan.py -->

# JA30 — Spring integration

Week 13 · Core · Warehouse checkpoint [B13](../../projects/B13/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Controller tests, integration boundaries and realistic fixtures.

## Do the work

Test shipment creation, validation and authorization at the API boundary with representative data.

## Pass check

The test suite checks response contracts and actual side effects, including a denied write.

## Read and practice

- Compare the boundaries of a service test and a web test. Pick the narrowest test that catches your failure. [Spring web testing guide](https://spring.io/guides/gs/testing-web/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 139. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> TestContext, MockMvc, transactional tests\
> context tests, controller tests, transactions, failure paths\
> DB/API integration, fixtures, failure behavior\
> MockMvc/TestContext, transactions, API/DB failure paths

### Exercise / interview prompt

> controller + DB tests\
> Interview: unit vs slice vs full integration?\
> Test REST auth/validation/rollback\
> Integration suite\
> Interview-ready testing\
> API integration suite

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja30)
