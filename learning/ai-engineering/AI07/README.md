<!-- Managed by export_warehouse_plan.py -->

# AI07 — LLM integration and validated structured output

Week 8 · Optional · Warehouse checkpoint [B08](../../projects/B08/README.md)

## Review and learn

Optional structured extraction, schemas and validation.

## Do the work

Treat a fixture as untrusted extracted shipment data. Validate required fields and reject a malformed record.

## Pass check

The test proves invalid data cannot become a reservation. AI use is unnecessary for the lab.

## Read and practice

- Validate a hand-written valid fixture and one that is missing a required field. [JSON Schema step-by-step guide](https://json-schema.org/learn/getting-started-step-by-step)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 90. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Requests, streaming, timeouts, retries, cost\
> JSON schema / validation / retries\
> Schemas/JSON validation, retries, deterministic handling

### Exercise / interview prompt

> Build a safe server-side call\
> Failure to test: Secret leakage, retry storms\
> Generate typed object and reject invalid\
> Failure to test: Malformed output

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/ai-engineering.md#ai07)
