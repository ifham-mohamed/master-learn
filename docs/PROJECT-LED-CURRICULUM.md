# Proposed project-led software engineering curriculum

This is the proposal that preceded implementation. Use the [Warehouse Dispatch requirements](../projects/warehouse-dispatch/README.md) and [published task plan](../sources/warehouse-dispatch/README.md) for the current warehouse, PostgreSQL and five-hour study path.

## What the repository already contains

The current workbook, the Master Plan HTML export, and the app data contain the same 236 task IDs in the same order. The 11 category sheets, category HTML exports, generated Markdown task headings, and learning directories also reconcile by ID. Every task has a README and the five learning sections. The source includes 24 weeks, 74 practice-bank entries, and five project profiles. The Java task folders currently contain scaffolds. The repository has a worked SQL example under `CS12` and the Learnspace application, with no runnable Java capstone found in the learning tree.

The current workbook records `G01`, `G02`, and `AI18` as Done and `CS12` as In progress. The HTML export and the app’s imported data show older progress. This audit covers repository files. Browser and live Google Sheets progress were outside the review. The workbook’s source schedule starts 29 September 2026 and Learnspace’s default starts 5 October 2026. Use week numbers for the curriculum and keep personal dates and capacity in the schedule settings.

Source references are the [workbook](../sources/Final%20Tracker.xlsx), [source HTML](../sources/html/Master%20Plan.html), [Markdown index](../sources/markdown/categories/master-plan.md), [app data](../src/data/tracker.json), and [repository guide](../README.md).

## Capstone proposal

Build a **warehouse dispatch and shipment tracker**. Start by creating and finding one shipment in a terminal. Then reserve stock, dispatch it, and track its status from a browser. Use a consistent shipment workflow through the Java CLI, Spring API, database, and React interface. Proposed roles are dispatcher, warehouse operator, and read-only viewer. Introduce tenant ownership when the security milestone needs it. Use synthetic data throughout.

Keep the runnable project in a proposed `projects/warehouse-dispatch/` directory. Build domain rules in plain Java so the CLI and Spring Boot can exercise the same logic. Add Maven when the first repeatable build needs it and pin a compatible Spring Boot version when the API milestone starts. JDK 21 and Maven are installed on this machine. Docker was not found on the command path during the audit. The capstone frontend is React with strict TypeScript. Learnspace is the separate Next.js application that tracks the work. Keep framework-specific Next.js material as an explicitly labeled interview comparison where the source calls for it.

**First use case.** In the terminal, enter a shipment reference, destination, SKU, and positive quantity. Create the shipment, look it up, and display its status. Handle blank fields, a non-number or nonpositive quantity, duplicate references, and unknown references. The first version keeps its data in memory for a single run. The next milestone extracts a `Shipment` model and a service that protects the rules. A later version adds `CREATED → RESERVED → DISPATCHED → DELIVERED`, with a test for a rejected transition.

This is the expected interaction for the first exercise. Record actual output separately after running your implementation.

```text
Command [create/find/exit]> create
Shipment reference> SHP-001
Destination> Colombo
SKU> BOX-42
Quantity> abc
Enter a whole number greater than zero.
Quantity> 3
Created SHP-001 with status CREATED.
Command [create/find/exit]> find
Shipment reference> SHP-001
SHP-001 | Colombo | BOX-42 | 3 | CREATED
```

**First Java skills.** Variables and basic types, `String`, reading lines with `Scanner`, parsing integers, conditionals, loops, methods, parameters and return values, then constructors, private fields, an enum, and composition. Add a collection once there is more than one shipment and a map when lookup by reference becomes a requirement. Introduce interfaces when a real boundary needs a second implementation, such as replacing in-memory storage with database persistence. Cover pass-by-value with a small change to the project and explain it from the observed result. Keep the source’s 20 syntax drills as short variations on the same flow. Assign generics, streams, records, and concurrency to their dedicated later tasks.

## Weekly build path

Use each existing `B` task as the integration checkpoint for that week’s learning tasks. A supporting task can use the same feature branch and evidence link as its build checkpoint. Record the specific behavior each task demonstrates and count implementation time once.

| Task | Change to the project | Evidence to save |
| --- | --- | --- |
| B01 | Run the shipment CLI and port a small shipment display helper to strict TypeScript. | Clean setup, valid and invalid terminal runs, TypeScript check, and one modeling decision. |
| B02 | Protect shipment identity and status with value objects and a composed service. Model the client’s loading, success, and error states. | Duplicate identity and invalid transition checks, plus typed state cases. |
| B03 | Make shipment lookup and DTO mapping explicit. Reuse one typed collection or generic boundary that has a second real use. | Tests for mapping, missing references, and invalid inputs. |
| B04 | Produce dispatch totals by destination or status. Exercise the async ordering that will matter in the client. | Totals checked against a fixture and results from the original async drills. |
| B05 | Boot the same shipment service through Spring dependency injection. Build a React shell using local fixture data. | Successful startup, health or smoke check, and a working shipment list screen. |
| B06 | Add shipment create and lookup endpoints with request and response DTOs. Build a React form and shipment routes. | Terminal API requests and a navigable form with labeled inputs. |
| B07 | Wire React to the API and validate request and response boundaries. | Creation and conflict responses, field errors, a malformed response case, and loading/error states. |
| B08 | Move shipment and reservation data into PostgreSQL with a versioned migration. Add reproducible frontend checks. | Clean database setup, a successful upgrade from the prior schema, and data that survives restart. |
| B09 | Diagnose and repair N+1 on the shipment list. Add client or service tests. | Query counts on the same fixture before and after, plus failing-then-passing tests. |
| B10 | Reproduce two simultaneous reservations for the last stock. Fix the invariant with a transaction and an explicit locking or conditional-update strategy. | Concurrent integration test proving one success, one conflict, and no negative stock. |
| B11 | Add login, logout, role checks, and tenant or ownership checks. | Positive role tests and negative tests for anonymous, forbidden, cross-tenant, and forged browser requests. |
| B12 | Complete the authenticated browser flow from shipment creation through dispatch. | Component tests, a keyboard walkthrough, and a browser test covering an error and a successful dispatch. |
| B13 | Harden the domain and controller test suites. Review a small failing change. | Reproduction, regression test, review notes, and the verified fix. |
| B14 | Run PostgreSQL integration tests against an isolated test database, package the stack with Compose, and add CI checks. | Fresh setup run, clean test output, and passing CI checks. |
| B15 | Add request correlation, useful metrics, and a measured query or React rendering improvement. Evaluate caching against a freshness requirement. | Before/after on the same workload, plus logs that identify a failed request without leaking data. |
| B16 | Package a staging deployment and run the two timed repository tickets from the source. Exercise rate limiting with `SD14`. | Staging smoke results, 429 behavior and recovery, and both ticket write-ups. |
| B17 | Review the evolved design and specify the next real feature, such as dispatch confirmation and exception handling. | Requirements, API contract, data model, failure cases, and acceptance tests. |
| B18 | Deliver that feature across React, Spring, and the database. | Contract and integration checks, and a walkthrough of the changed flow. |
| B19 | Make dispatch confirmation safe to retry. Evaluate queue and offline failure cases. | Replay tests for the same key and payload, rejection of conflicting reuse, and a recovery drill. |
| B20 | Release the hardening changes and rehearse recovery. | CI result, deployment smoke run, rollback and restore evidence, architecture summary, and portfolio demo. |
| B21 | Run the timed Java, SQL, and debugging rounds and repair three observed gaps. | Timed attempts, fixes, and retest evidence. |
| B22 | Complete an unfamiliar-repo ticket in the assigned AI modes. | Before/after results, assistance log, and independent verification. |
| B23 | Rehearse Spring, React, and project deep dives against actual changes. | Recorded answers, unresolved questions, and independent retry. |
| B24 | Complete both simulations and finish the evidence package. | Mock scores, question-bank follow-up, and a clean-clone demo a reviewer can repeat. |

`G09` owns the final measurement and explanation. `PF01` remains a record of existing Project ONE exposure and personal contributions. `PF02` can use the stock reservation race as a separate concurrency lab. `PF03` remains a bounded AI debugging exercise. `PF04` and `PF05` can showcase the backend and React client from the same capstone. Keep their original Core or Optional designations. [Original project records](../sources/markdown/categories/projects.md)

## How each track contributes

| Track | Existing task IDs | Proposed application |
| --- | --- | --- |
| Java & Spring (31) | JA05–JA08, JA09–JA13, JA16, JA17–JA26, JA14, JA27–JA35, optional JA15 | CLI syntax and modeling, collections and errors, same service in Spring, API contracts, JPA and concurrency, authentication and authorization, testing, packaging, and observability. Investigate memory or thread behavior under a repeatable workload. |
| TypeScript & UI (29) | TS05–TS16, TS17–TS31, FE32, FE35 | Use TypeScript early for shipment states and data boundaries. Build React components, accessible forms, typed routes, API errors, secure login, tests, and measured render improvements. Keep TS22 as the optional Node.js comparison. |
| CS & SQL (15) | CS07–CS15, CS18–CS22, G05 | Query shipment, stock and customer fixtures. Observe normalization, NULLs, aggregation, indexes, transaction behavior, and locks. Trace the browser request through DNS, TLS, HTTP, and the server. Relate processes and threads to observed app behavior. |
| Engineering (15) | G02, EN26, RW20, RW05, G06, RW06, RW10, EN28, RW11, RW16, OP20, EN30, G08, RW12, RW14 | Use clean setup, small commits, code reading, migrations, reproduction, reviews, refactoring, performance, CI, deployment recovery, and API failure handling on actual project changes. Keep OP20 optional. |
| AI Engineering (7) | AI18, AI05, AI07, AI17, AI09, AI14, AI10 | Run AI-free baselines where assigned. Log what assistance changed, redact inputs, and review diffs and tests. Keep structured extraction, agents, and retrieval as optional extensions. |
| DSA (24) | DS01–DS24 | Keep the 145-problem schedule. Apply a few patterns to real needs, such as maps for reference lookup, queues for dispatch work, heaps for a priority queue experiment, and intervals for dock scheduling. Use timed practice for patterns the project does not need. |
| System design (10) | SD05, SD07, SD13, SD10, SD12, SD14–SD17, SD21 | Use dispatch requirements and data shape to derive constraints. Exercise retry, caching and rate limits. Compare search, file storage, load balancing, replicas, and offline sync against defined scenarios. Use isolated labs when the main application has no need for the component. |
| Projects (30) | B01–B24, G09, PF01–PF05 | Use the weekly build path and final proof above. |
| Mock interviews (44) | M01–M44 | Reproduce, explain, or extend a real project change under time. Keep separate coding drills, scoring, and each mock’s AI policy. |
| Review (25) | G01, RV01–RV24 | Review capacity, failed cases, evidence quality, and what you can repeat without help. Use the existing spaced review tools. |
| Career (6) | G03, G04, G07, BE76, BE79, G10 | Use real PRs, bugs, metrics, and decisions in the résumé, demo, and interview stories. Separate capstone ownership from prior Project ONE exposure. |

## Engineering acceptance checks

- **Data and correctness.** Use PostgreSQL as the primary capstone database, consistent with the existing `B14` and `PF04` tasks. Add a contained MySQL comparison using the same schema and seed cases for joins, constraints, query plans, and a two-connection isolation exercise. Record engine-specific SQL and behavior. Use constraints and bound parameters, version migrations, and rehearse backup and restore. Save query plans from the same dataset before and after an indexing change. [PostgreSQL query-plan guide](https://www.postgresql.org/docs/current/using-explain.html)
- **Browser login and API identity.** Start with Spring Security, a server-managed session, secure cookie settings in staging, CSRF protection, and backend authorization on every protected operation. In a separate lab, add OIDC sign-in through an identity provider and compare its login and logout behavior. For an external API consumer, exercise a resource server that validates provider-issued access tokens and their issuer, audience, and expiry. Test unauthorized requests, cross-tenant reads and writes, expired credentials, and logout. Derive tenant identity on the server. [Spring session management](https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html), [Spring OAuth 2.0](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html)
- **Abuse and application security.** Separate login throttling from general API rate limiting. Exercise bursts, sustained requests, correct 429 responses, recovery, and isolation between clients. Start with a single-instance limiter and compare a shared limiter if the system-design lab uses replicas. Add a threat model, narrow CORS where required, safe rendering of user data, dependency checks, and tests for data leakage. Keep credentials and private logs out of the tracker and deployed learning files.
- **Frontend behavior and performance.** Keep form state close to the form, use the URL for shareable filters, and handle server data, cache invalidation, and sign-out separately. Cover empty, loading, error, stale, and permission-denied states. Measure rendering on a realistic list before adding memoization or virtualization. Test focus, keyboard operation, and accessible feedback. [React state guide](https://react.dev/learn/managing-state), [React Profiler](https://react.dev/reference/react/Profiler)
- **Reliability and operations.** Set a small, explicit workload and success targets. Measure response time, error rate, query count, and resource use where relevant. Put timeouts on external calls. Retry bounded, safe operations, and deduplicate retryable writes. Add request IDs, useful health checks, a staging smoke test, a runbook, and a recovery exercise. Decide whether a queue, shared cache, replica, or service split solves a measured problem. Keep the main application a modular monolith during the core path.
- **Engineering judgment.** For each milestone, write one requirement, one invariant, one failure you tried, and one decision with its trade-off. Prefer small reversible changes and use interfaces, design patterns, and SOLID principles where an actual change tests their value. Show a fresh rerun and one independent variation before calling a skill practiced. Mark the task Done only after saving evidence and any required mock scores.

## First pilot and tracking contract

Start with the linked slice below. Continue the recorded `CS12` work by adapting its JOIN fixture to shipments and warehouses. It can run independently while the Java CLI is being built. Use the already-recorded setup tasks as context for the pilot and verify the local run command before building on it.

| Task | Work to attempt | Acceptance check |
| --- | --- | --- |
| [JA05](../learning/java-and-spring/JA05/README.md) | Read and validate terminal input. Create and look up a shipment. | Save one successful run and separate invalid input runs. Explain how a method receives a primitive and an object reference. Repeat one variation unaided. |
| [JA06](../learning/java-and-spring/JA06/README.md) | Move state and rules into `Shipment` and `ShipmentService`. Keep terminal interaction separate. | The same terminal commands work, a domain test rejects an illegal state change, and you can explain why the service uses composition. |
| [B01](../learning/projects/B01/README.md) | Deliver the first runnable slice and the strict TypeScript shipment formatter. | A clean clone has one documented run command. Save the Java and TypeScript checks and an explanation of one design choice. |
| [CS12](../learning/cs-and-sql/CS12/README.md) | Report shipments with warehouse assignments, including a warehouse with no shipments. | Save expected and actual rows for INNER and LEFT JOIN, including why an unmatched warehouse appears only in the latter result. |
| [RV01](../learning/review/RV01/README.md) | Review the CLI and SQL evidence and compare effort with actual weekly capacity. | Record what you can repeat unaided, where you needed help, and the next small build. |

For each upgraded task, store its existing ID, milestone, prerequisite or required prior feature, essential concepts, project change, reproducible run or test, evidence expectation, and core or extension scope. Put predictions and decisions in Notes, short explanations in Theory, code pointers in Code, actual output in Results, and references in Resources. Keep runnable code and shared tests in the capstone project. Record commit IDs and commands with results. A completion entry should point to evidence someone can inspect or repeat. Use repository-relative paths in evidence and explicit Learnspace task links for navigation between tasks.

## Proposed repository changes after review

1. **Pilot first.** Add the capstone project and link `JA05`, `JA06`, `B01`, `CS12`, and `RV01` to the first runnable milestone. Keep AI-free-first exercises as instructions and tests that leave room for the learner’s first attempt. Provide a runnable checkpoint after the attempt or on request. Review the pilot evidence before expanding the full backlog.
2. **Maintain one set of curriculum changes.** Add a task-ID keyed curriculum file containing the upgrade fields above. Use it for a versioned workbook learning-plan view and generated Markdown and HTML. Keep `Master Plan` IDs, formula references, and Google sync columns stable. Put the new Excel view in a dedicated tab after validating the current workbook’s tables, formulas, validations, and charts. Archive the existing HTML and generated Markdown as historical source exports and publish updated views separately. Preserve saved progress, current user notes, and the original task references.
3. **Make the next action visible in Learnspace.** Add a capstone path to Projects and a compact task card above the existing learning workspace showing the current build, essential skills, run command, and evidence checklist. Surface the first actionable task or missing prerequisite on Today. Reuse the existing timer, progress form, and readiness logic. Test both the local server and GitHub Pages export, including direct task links and progress restore.
4. **Re-estimate after the pilot.** The source already allocates 16.25 core hours against 13 in week 1. Weeks 4 and 5 also exceed capacity. Count shared implementation once, leave room for retests and review, and move deep labs to extensions when they exceed capacity. Keep the 24-week assignments as the reference and use actual weekly hours to set a personal pace.

## Decisions for the next pass

- **Capstone focus.** Warehouse stock reservation and dispatch is the proposed core. Carrier and delivery exception tracking is an alternative if transport operations matter more to you.
- **Database order.** PostgreSQL first with one MySQL comparison lab follows the tracker. MySQL first, with a later migration to PostgreSQL, adds a deeper portability milestone and more setup time.
- **Pace.** Provide the hours you can reliably study each week. The proposed default is one runnable checkpoint per study cycle, using the 24-week plan for reference and moving lower-priority depth work as needed.
