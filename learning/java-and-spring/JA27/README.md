<!-- Managed by export_warehouse_plan.py -->

# JA27 — Authentication

Week 11 · Core · Warehouse checkpoint [B11](../../projects/B11/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Authentication, password encoding, sessions, CSRF and logout.

## Do the work

Implement a Spring Security browser session for seeded demo users. Practice OIDC and external bearer-token validation in separate comparisons.

## Pass check

Correct credentials establish a session. Invalid login, missing CSRF and requests after logout are denied.

## Read and practice

- Trace a browser session from sign-in to sign-out and test a rejected request. [Spring Security sign-in guide](https://spring.io/guides/gs/securing-web/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 120. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> security architecture, password auth, JWT/OAuth2 concepts\
> authentication, authorization, filter chain concept, method security, OAuth2/JWT\
> Sessions/JWT/OIDC concepts and security boundaries\
> authentication vs authorization, filter chain, request/method security, JWT/OAuth2 concepts

### Exercise / interview prompt

> login/token flow\
> Interview: session vs JWT?\
> Secure endpoints and fix horizontal privilege issue\
> RBAC + tenant isolation\
> Core enterprise backend\
> Implement RBAC + ownership checks

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja27)
