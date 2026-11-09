<!-- Managed by export_warehouse_plan.py -->

# AI10 — Retrieval, grounding and citations

Week 19 · Optional · Warehouse checkpoint [B19](../../projects/B19/README.md)

## Review and learn

Optional retrieval, source grounding and uncertainty.

## Do the work

Manually retrieve the applicable warehouse rule from supplied docs and cite the exact supporting section.

## Pass check

Show what happens when a query lacks supporting evidence or matches conflicting rules.

## Read and practice

- Write one observable failure case and test it with a synthetic fixture or a stubbed action. [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 195. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> Chunking, similarity, metadata filters\
> Answer only from retrieved evidence\
> Chunking, retrieval, grounding, citations, evaluation

### Exercise / interview prompt

> Build mini knowledge search\
> Failure to test: Wrong retrieval\
> Return evidence with answer\
> Failure to test: Confident hallucination

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/ai-engineering.md#ai10)
