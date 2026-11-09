<!-- Managed by export_warehouse_plan.py -->

# SD15 — File/object storage

Week 16 · Core · Warehouse checkpoint [B16](../../projects/B16/README.md)

## Review and learn

Object storage, access control, signed access and retention.

## Do the work

Design an optional proof-of-dispatch attachment flow using synthetic files.

## Pass check

Show a tenant-isolated access test or an explicit design test case with expiration.

## Read and practice

- Model a short-lived download and test the expired or wrong-tenant case with synthetic data. [AWS S3 presigned URL guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 177. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> DB vs object storage, signed URL concept

### Exercise / interview prompt

> Design: Product images\
> Trade-off: security vs convenience

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/system-design.md#sd15)
