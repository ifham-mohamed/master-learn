# JA17 — IoC / DI

Week 5 · Core · Warehouse checkpoint B05

Before you begin, complete JA06.


## Review and learn

Dependency injection, composition roots and test doubles.

## Do the work

Inject the existing shipment service and repository in Spring while keeping domain rules independent of HTTP.

## Pass check

A domain test runs without a server. Spring starts with the intended dependency.

## Further architecture practice

- 1. Establish service boundaries · after B14. A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.

Write the work yourself. Add one entry in the [learning log](journal.md) or use the Learning log form in Learnspace. Write what you learned, what you tried and observed, and your next step. Link output from `results/` when it needs a separate file.
