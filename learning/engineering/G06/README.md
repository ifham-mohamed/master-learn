<!-- Managed by export_warehouse_plan.py -->

# G06 — Create and test a database migration

Week 8 · Core · Warehouse checkpoint [B08](../../projects/B08/README.md)

Before you begin, complete [JA23](../../java-and-spring/JA23/README.md).

## Review and learn

Versioned migrations, forward compatibility and recovery.

## Do the work

Add an additive shipment schema migration. Rehearse both fresh setup and upgrade from a populated fixture.

## Pass check

Rows survive upgrade, the new rule holds, and a failed upgrade has a documented recovery.

## Read and practice

- Run your migration from a blank database and from an earlier schema state. [Spring Boot database initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 94. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Use one migration tool, migrate an empty and populated database, and test recovery from a failed change. Keep schema history in version control.

### Exercise / interview prompt

The workbook leaves this cell blank.

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/engineering.md#g06)
