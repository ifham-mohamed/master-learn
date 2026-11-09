<!-- Managed by export_warehouse_plan.py -->

# CS08 — Normalization

Week 3 · Core · Warehouse checkpoint [B03](../../projects/B03/README.md)

## Review and learn

Keys, dependencies and normalization.

## Do the work

Sketch warehouse, SKU, stock, shipment and shipment-line tables. Compare with one denormalized spreadsheet-style record.

## Pass check

Demonstrate one update anomaly the normalized model prevents.

## Read and practice

- Turn one business rule into a constraint and insert a deliberately invalid fixture. [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 32. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> 1NF/2NF/3NF and denormalization trade-offs\
> DDL/DML, joins, constraints, indexes, transactions, isolation\
> Schema, constraints, transactions, indexes, EXPLAIN basics\
> 1NF–3NF reasoning, entities, cardinality, integrity

### Exercise / interview prompt

> Interview: Normalize this schema\
> Design + query a commerce schema\
> Schema + 20 SQL questions\
> Shared database foundation

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/cs-and-sql.md#cs08)
