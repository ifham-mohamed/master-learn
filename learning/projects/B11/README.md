<!-- Managed by export_warehouse_plan.py -->

# B11 — Secure the warehouse workflow

Week 11 · Core · Warehouse checkpoint B11

Before you begin, complete [B10](../../projects/B10/README.md).

## Review and learn

Session login, CSRF, role checks and tenant isolation.

## Do the work

Secure shipment reads and writes with Spring Security. Add login, logout and UI states for denied and expired access.

## Pass check

Verify allowed access, wrong role, another tenant, missing CSRF and logout with tests.

## Read and practice

- Trace a browser session from sign-in to sign-out and test a rejected request. [Spring Security sign-in guide](https://spring.io/guides/gs/securing-web/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 123. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: Sessions/JWT + CORS/CSRF/XSS\
> Design: Security boundaries + tenant isolation\
> AI practice: Security-review AI output; never trust generated auth code\
> RBAC + ownership/tenant checks + security regression tests\
> Security - Multi-tenant merchant portal\
> Secrets/privacy - Identify sensitive context boundaries

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b11)
