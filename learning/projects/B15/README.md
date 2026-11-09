<!-- Managed by export_warehouse_plan.py -->

# B15 — Measure performance and trace failures

Week 15 · Core · Warehouse checkpoint B15

Before you begin, complete [B14](../../projects/B14/README.md).

## Review and learn

Observability, cache freshness, performance baselines and measurements.

## Do the work

Trace a failed request and measure a slow shipment list or query before choosing a fix.

## Pass check

Save an anonymized trace and comparable measurements with one explained trade-off.

## Read and practice

- Compare health output with a failed dependency and trace one request through the project. [Spring Boot Actuator guide](https://spring.io/guides/gs/actuator-service/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 158. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Demonstrate the working output, relevant tests, and one design trade-off.

### Exercise / interview prompt

> CS/SQL: Indexes/query performance revision\
> Design: Caching + search + pagination + observability\
> AI practice: AI-assisted performance hypothesis; measure before accepting\
> Add logs/metrics/cache; investigate query or rendering bottleneck\
> Caching - Product catalogue cache\
> Search - Product/business search\
> Observability - Debug failed checkout\
> Measure performance before accepting AI optimization

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/projects.md#b15)
