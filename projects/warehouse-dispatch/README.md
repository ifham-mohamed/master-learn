# Warehouse Dispatch

Build this project yourself in small, runnable steps. Use official documentation, your compiler, debugger, tests, and notes. Write your own implementation and your own tests. The learning briefs specify observable behavior and leave implementation choices to you.

## Start with one terminal workflow

1. Open [JA05](../../learning/java-and-spring/JA05/notes/00-warehouse-practice.md). Check `java -version` and `javac -version`, then create your first source file here. Compile it with `javac` and run the class containing `main` with `java`.
2. Ask for a shipment reference, destination, SKU and quantity. Try `SHP-001`, Colombo, `BOX-42`, and `3`. Save the record in memory and find it again by reference within the same run.
3. Try a blank reference, `abc`, `0`, a duplicate reference, and a lookup for an unknown reference. Decide how the terminal helps the operator recover from each case. Save what you observed.
4. In [JA06](../../learning/java-and-spring/JA06/notes/00-warehouse-practice.md), move the rules into your own shipment model and service. Keep the input menu working. In [B01](../../learning/projects/B01/notes/00-warehouse-practice.md), add the typed shipment display helper and document the clean run.

The [HTML learning plan](../../sources/warehouse-dispatch/index.html) and [Markdown task index](../../sources/warehouse-dispatch/README.md) show each later step. Continue [CS12](../../learning/cs-and-sql/CS12/notes/00-warehouse-practice.md) alongside the CLI if you want to alternate Java and SQL.

In Learnspace, open **Projects → Build order** for each checkpoint’s preparation tasks, pass check, and follow-up practice. Use the [architecture lab briefs](../../sources/warehouse-dispatch/architecture.md) for modular boundaries, RabbitMQ, the Tracking microservice, a separate React release, distributed recovery, and algorithm measurement. The core build and each lab require your own tests and observed results.

## Business workflow

A dispatcher creates an outbound shipment for one warehouse and destination. A warehouse operator receives stock, reserves it, confirms a pick, and records dispatch. A viewer reads inventory and shipment history for their authorized scope. Start with one SKU per shipment. Add multiple lines, another warehouse and a second tenant as the relevant tests require them.

| Operation | Required behavior | Example to test |
| --- | --- | --- |
| Receive | A positive whole quantity increases on-hand stock for one SKU and warehouse. Record a stock movement with its receipt reference. | Receiving 10 into an empty warehouse makes 10 available. Reject invalid quantities and duplicate receipts. |
| Create shipment | Capture an immutable reference, warehouse, destination and one or more positive SKU quantities. Initial state is `CREATED`. Use synthetic destinations and recipients. | Creating a shipment does not move stock. A duplicate reference within the tenant fails. |
| Reserve | Move a shipment to `RESERVED` only if every line has sufficient available stock. Increase reserved stock while on-hand stays unchanged. | Reserving 3 of 10 leaves 10 on hand, 3 reserved and 7 available. A second request for 8 fails. |
| Cancel | Allow cancellation from `CREATED` or `RESERVED`. Release each active reservation once. For a picked shipment, use the later exception flow. | Cancelling a reservation for 3 restores availability to 10. A repeated cancel leaves balances unchanged. |
| Pick | Confirm all reserved SKU quantities before entering `PICKED`. Record who confirmed and when. | A wrong SKU or quantity leaves the shipment reserved. Picking leaves physical balances unchanged. |
| Dispatch | Require a confirmed pick. In one transaction, deduct the picked quantity from on-hand and reserved stock, record movements and mark `DISPATCHED`. | Dispatching 3 from 10 on hand and 3 reserved leaves 7 on hand and 0 reserved. Double dispatch has one physical effect. |
| Record delivery or exception | Add this after the dispatch flow works. Record an event with shipment, time, location, actor or source, and reason. A dispatch exception keeps the event history and follows an explicit state rule. | An out-of-order delivery confirmation is rejected. A failed delivery does not automatically return stock to the warehouse. |

### Rules to carry through each version

- Available stock equals on hand minus reserved. All quantities are whole units and `0 ≤ reserved ≤ on hand`. Use warehouse and SKU together when looking up stock. Stock in another warehouse cannot satisfy a reservation for this warehouse.
- Aggregate or reject repeated SKU lines before checking availability. For multiple lines, a failed line leaves every balance and shipment state unchanged. A two-client test for the last unit must prove one successful reservation and one business conflict.
- Each transition and stock movement needs a traceable reference. Record timestamps consistently and test ordering when events share a timestamp. Enforce allowed transitions and role/scope checks on the server. Tenant scope comes from the signed-in identity.
- Start with Spring Security sessions for the React browser application. Compare an OIDC login and an external API access-token flow in separate exercises. Keep tests for anonymous requests, wrong roles, cross-tenant access, CSRF, and logout.
- Add idempotency after the basic operation is correct. Retry the same request after a simulated lost response and verify it has one committed effect. Reusing a key for a different request must fail. Keep receipts and dispatches auditable.

The stock distinctions and picking workflow are based on the [Dynamics 365 inventory reference](https://learn.microsoft.com/en-us/dynamics365/supply-chain/inventory/inventory-on-hand-list) and [picking confirmation guide](https://learn.microsoft.com/en-us/dynamics365/supply-chain/warehousing/piece-picking-confirmation). The event fields are inspired by [GS1 EPCIS](https://support.gs1.org/support/solutions/articles/43000755325-what-is-electronic-product-code-information-services-epcis-). The capstone implements the simpler rules in this brief.

## How the project grows

| Phase | Integration tasks | Finish when |
| --- | --- | --- |
| Terminal and domain | B01–B04 | A clean run can create, find and summarize shipments. Independent tests protect quantities, identity, and state rules. |
| Spring and React | B05–B07 | The browser can create and look up a shipment through a tested HTTP contract with validation and useful error states. |
| PostgreSQL and reservation | B08–B10 | Data survives restart, migration works with existing data, and contention cannot oversell stock. |
| Secure warehouse workflow | B11–B14 | Signed-in operators can reserve, pick and dispatch. Unauthorized writes fail and a clean environment passes automated tests. |
| Operational readiness | B15–B20 | The system has traceable events, measured performance, safe retries, rate limits, staging smoke tests, and a rehearsed recovery. |
| Independent demonstration | B21–B24 | You can build and explain a small change under time and give a repeatable project demo with real evidence. |

Use PostgreSQL as the main database. A MySQL comparison can come after PostgreSQL migrations and concurrency tests pass. Returns and receiving reconciliation, lots and expiry, barcode scanning, carrier adapters, or multi-warehouse allocation are extensions. Pick one when it solves a concrete user problem and write its success and failure cases first.

## Five-hour study session

| Time | Action |
| --- | --- |
| 45 min | Recall a previous rule or concept from memory, then check one new concept in the documentation. |
| 150 min | Write the smallest behavior yourself. Work in focused blocks and take breaks as needed. |
| 60 min | Run the normal path and an edge case. Debug, improve the test, or make a small follow-up change unaided. |
| 45 min | Save evidence, write the next action, and do a short recall or timed practice exercise. |

One evidence entry is enough for a session. Record **what you ran**, **what actually happened**, and **what you will try next**. Add a commit or result path when available. Use Learnspace's journal for private scratch notes and its progress form for task evidence. Put repeatable output in the task's `results/` folder when it needs a durable file. Keep statuses and hours based on your own work.
