# Advanced warehouse architecture labs

Work through the listed checkpoints first. Labs extend the capstone and use the existing task IDs for evidence.

## 1. Establish service boundaries

After [B14](index.html#B14) · Related tasks [SD05](index.html#SD05), [SD07](index.html#SD07), [JA17](index.html#JA17), [JA25](index.html#JA25), [RW11](index.html#RW11), [B14](index.html#B14)

**Build.** Draw Inventory, Dispatch and Tracking boundaries inside the Spring application. Give each module a clear owner and public interface. Keep reservation, stock mutation and dispatch confirmation within the same transaction. Write an architecture decision record explaining what would justify extracting a service.

**Check.** A boundary test catches a forbidden dependency. The last-unit and rollback tests still pass. State which data is authoritative and how you would roll back a split.

- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)

## 2. Publish dispatch events through RabbitMQ

After [B19](index.html#B19) · Related tasks [SD13](index.html#SD13), [JA25](index.html#JA25), [RW14](index.html#RW14), [B19](index.html#B19), [M29](index.html#M29)

**Build.** Record a versioned DispatchConfirmed event in a PostgreSQL outbox in the same transaction as dispatch. Publish through RabbitMQ and wait for broker confirmation. The consumer commits a deduplicated result before acknowledging. Cap retries, route failed messages to a dead-letter queue, and retain an event archive for rebuilding projections. Compare a RabbitMQ work queue with a retained Kafka log, using partition keys and consumer offsets to reason about ordering and replay.

**Check.** Roll back a dispatch, stop the broker after commit, interrupt the publisher before marking a send, and replay a poison message. Show zero events for the rollback, eventual delivery for the committed event and one consumer effect under redelivery.

- [Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)
- [RabbitMQ reliability](https://www.rabbitmq.com/docs/reliability)
- [Apache Kafka concepts](https://kafka.apache.org/documentation/)

## 3. Extract a Tracking microservice

After [B20](index.html#B20) · Related tasks [SD07](index.html#SD07), [SD13](index.html#SD13), [SD17](index.html#SD17), [TS29](index.html#TS29), [B18](index.html#B18), [B20](index.html#B20), [M31](index.html#M31)

**Build.** After the broker lab, extract the read-oriented tracking projection. Give it its own PostgreSQL database and schema migrations, API and release. Update it from versioned events without reading the dispatch tables. Document eventual consistency, projection rebuild, stale-state UX, and service authentication. Model compensation for a hypothetical cross-service reservation as a separate design exercise.

**Check.** Take Tracking down while dispatch continues. Restart it and rebuild a clean projection from the retained event archive. Reconcile results. Run API contract tests, deploy Tracking independently, and rehearse routing traffic back to the original tracking view.

- [Service data ownership](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/)
- [Saga patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)

## 4. Release a Tracking micro-frontend

After [B20](index.html#B20) · Related tasks [TS17](index.html#TS17), [TS19](index.html#TS19), [TS20](index.html#TS20), [TS24](index.html#TS24), [TS25](index.html#TS25), [TS28](index.html#TS28), [FE35](index.html#FE35), [PF05](index.html#PF05)

**Build.** After the Tracking service lab, separate the read-only Tracking routes into an independently built React frontend. Compose at the route boundary. Define shared navigation, session behavior, accessibility and API contracts. Compare this with keeping feature modules in one React build.

**Check.** Deploy and roll back the Tracking frontend without rebuilding Dispatch. Verify keyboard navigation, direct URLs, sign-out, API failure fallback, and bundle size before and after the split.

- [Independently deployable micro-frontends](https://martinfowler.com/articles/micro-frontends.html)

## 5. Prove the distributed system can recover

After [B20](index.html#B20) · Related tasks [JA32](index.html#JA32), [EN28](index.html#EN28), [G08](index.html#G08), [RW16](index.html#RW16), [SD10](index.html#SD10), [SD14](index.html#SD14), [SD16](index.html#SD16), [SD17](index.html#SD17), [SD21](index.html#SD21), [G09](index.html#G09)

**Build.** Set a workload and targets for latency, errors and projection lag. Trace request and event IDs across components. Exercise rate limits, stale reads, backlog pressure, restore, and rollback. Compare container deployments and orchestration using the needs you measured.

**Check.** Save p95 latency, error rate, oldest queued event, recovery time and restored-data checks. Test a failed release and write a runbook another person can follow.

- [RabbitMQ failure and recovery behavior](https://www.rabbitmq.com/docs/reliability)

## 6. Measure algorithms against warehouse workloads

After [B10](index.html#B10) · Related tasks [JA08](index.html#JA08), [CS09](index.html#CS09), [DS01](index.html#DS01), [DS07](index.html#DS07), [DS08](index.html#DS08), [DS09](index.html#DS09), [DS10](index.html#DS10), [SD12](index.html#SD12), [RW16](index.html#RW16)

**Build.** Compare reference lookup with a map and a database index. Use a heap for a prioritization experiment, intervals for dock scheduling, and a graph for warehouse route planning or dependencies. State complexity and compare representative workloads. Keep stock correctness in the transactional database.

**Check.** Save a baseline, input size, edge cases and measured costs. Explain which structures belong in the main application and which remain interview or design exercises.
