<!-- Managed by export_warehouse_plan.py -->

# CS21 — HTTPS/TLS

Week 6 · Core · Warehouse checkpoint [B06](../../projects/B06/README.md)

## Review and learn

TLS, certificate validation and termination.

## Do the work

Inspect staging HTTPS and trace where TLS terminates. Use a local test endpoint if staging is not ready.

## Pass check

Show a valid connection and a rejected untrusted certificate case without bypassing validation.

## Read and practice

- Inspect the certificate and hostname of a test endpoint and identify where TLS terminates. [MDN transport layer security](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 70. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Encryption/authentication concept, certificates

### Exercise / interview prompt

> Interview: How does HTTPS protect traffic?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#cs21)
