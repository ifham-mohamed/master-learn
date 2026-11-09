<!-- Managed by export_warehouse_plan.py -->

# JA19 — Configuration / profiles

Week 6 · Core · Warehouse checkpoint [B06](../../projects/B06/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Profiles, environment configuration and secrets.

## Do the work

Separate local fixture settings from database and staging settings. Document the required environment variables.

## Pass check

The selected profile uses the intended data source. A missing required variable fails safely.

## Read and practice

- Start the app with two local configurations and check which setting each one uses. [Spring Boot profiles](https://docs.spring.io/spring-boot/reference/features/profiles.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 71. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> application properties/yaml, env vars, profiles, config properties

### Exercise / interview prompt

> profile-specific app config\
> Interview: how manage dev/test/prod config?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja19)
