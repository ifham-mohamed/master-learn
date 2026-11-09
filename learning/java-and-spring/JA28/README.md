<!-- Managed by export_warehouse_plan.py -->

# JA28 — Authorization

Week 11 · Core · Warehouse checkpoint [B11](../../projects/B11/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

Roles, tenant ownership, warehouse scope and deny-by-default rules.

## Do the work

Enforce permissions in the backend for reserve, pick, dispatch and read operations. Derive scope from the signed-in user.

## Pass check

Allowed operations work. Wrong role, another tenant's ID and guessed resource IDs are rejected.

## Read and practice

- Draw the roles and warehouse scopes for one endpoint, then test a denied request. [Spring Security authorization](https://docs.spring.io/spring-security/reference/servlet/authorization/index.html)
- Use a training lab to recognize an ownership bypass. Create a regression check using synthetic project accounts. [PortSwigger access control labs](https://portswigger.net/web-security/access-control)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 121. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> request rules, method security, ownership/tenant checks\
> Exploit path + mitigation + tests\
> authn/authz, tenant isolation, secrets\
> Ownership, roles/permissions, tenant boundaries

### Exercise / interview prompt

> RBAC + ownership tests\
> Interview: 401 vs 403? broken object auth?\
> Find auth/authorization/validation flaw\
> Practice mode: AI-free Yes, AI-assisted Yes\
> Design: Multi-tenant merchant portal\
> Trade-off: least privilege vs usability

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja28)
