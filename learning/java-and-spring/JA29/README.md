<!-- Managed by export_warehouse_plan.py -->

# JA29 — JUnit / Mockito

Week 13 · Core · Warehouse checkpoint [B13](../../projects/B13/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Unit tests, test boundaries, doubles and regression cases.

## Do the work

Test reservation, cancellation and transition rules in plain Java. Use a fake or mock only at a real boundary.

## Pass check

Tests fail when an invariant is intentionally broken and pass when restored.

## Read and practice

- Run the same stock invariant against a small table of accepted and rejected quantities. [JUnit parameterized tests guide](https://docs.junit.org/current/writing-tests/parameterized-classes-and-tests.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 138. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> fast unit tests, mocks, stubs, boundaries\
> unit boundaries, mocks/stubs, assertions, parameterized tests\
> Arrange/act/assert, boundaries, mocks/stubs\
> unit tests, mocks/stubs, parameterized tests, boundaries

### Exercise / interview prompt

> service unit suite\
> Interview: when is mocking harmful?\
> Unit-test service without starting Spring\
> 50 focused unit tests\
> Java testing base\
> Test service without Spring context

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja29)
