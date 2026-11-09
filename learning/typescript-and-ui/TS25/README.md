<!-- Managed by export_warehouse_plan.py -->

# TS25 — E2E

Week 12 · Core · Warehouse checkpoint [B12](../../projects/B12/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md).

## Review and learn

End-to-end tests, seeded state and stable locators.

## Do the work

Exercise login, shipment create, reserve, pick and dispatch in a real browser.

## Pass check

Verify the final state and one rejected action without depending on test order.

## Read and practice

- Run one full browser workflow and keep the assertion on its visible result. [Playwright writing tests](https://playwright.dev/docs/writing-tests)

## Further architecture practice

- **4. Release a Tracking micro-frontend.** Deploy and roll back the Tracking frontend without rebuilding Dispatch. Verify keyboard navigation, direct URLs, sign-out, API failure fallback, and bundle size before and after the split. Start after [B20](../../projects/B20/README.md).

[Independently deployable micro-frontends](https://martinfowler.com/articles/micro-frontends.html)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 130. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> critical flows, stable fixtures, API failures\
> Critical user journeys and stable fixtures

### Exercise / interview prompt

> checkout/booking flow\
> Interview: what belongs in E2E?

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/typescript-and-ui.md#ts25)
