# System design — complete HTML snapshot

Source: [original HTML](../../html/System%20design.html)

Static source values, not current app progress. Export support scripts and formatting are not learning content. Cell labels use the export column order after removing its decorative freeze bar.

## Export record 1

### Column 1

System design tasks

## Export record 2

### Column 1

Category

### Column 3

System design

### Column 4

Tasks

### Column 5

10

### Column 6

Complete

### Column 7

0

### Column 8

Progress

### Column 9

0%

## Export record 3

### Column 1

Linked view. Edit the Master Plan; changes appear here automatically. Use Task ID to find the original row.

## Export record 4

### Column 1

Shows up to 300 tasks. Order follows the Master Plan.

## Export record 5

### Column 1

Task ID

### Column 2

Start week

### Column 3

Task / deliverable

### Column 4

Status

### Column 5

Priority

### Column 6

Scope

### Column 7

Estimate (h)

### Column 8

Actual (h)

### Column 9

Due date

### Column 10

Completion check

### Column 11

Next action / blocker

### Column 12

Done when

### Column 13

Exercise / interview prompt

### Column 14

Prerequisite IDs

### Column 15

Plan section

### Column 16

Category

### Column 17

Evidence / result

### Column 18

Completed on

### Column 19

Review due

### Column 20

AI practice mode

### Column 21

Source IDs

### Column 22

Source position

## Export record 6

### Column 1

SD05

### Column 2

5

### Column 3

Requirements

### Column 4

Not started

### Column 5

P0

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

02 Nov 26

### Column 12

Functional/non-functional, constraints, scale
Functional/non-functional requirements and constraints

### Column 13

Design: Clarify a booking service
Trade-off: scope vs time

### Column 15

Requirements

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028
S022

### Column 22

61

## Export record 7

### Column 1

SD07

### Column 2

5

### Column 3

Data model

### Column 4

Not started

### Column 5

P0

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

02 Nov 26

### Column 12

entities, keys, constraints
Endpoints, entities, invariants, constraints

### Column 13

Design: POS order + inventory
Trade-off: normalization vs query speed

### Column 15

Data model

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028
S019

### Column 22

62

## Export record 8

### Column 1

SD13

### Column 2

14

### Column 3

Queues, retries and service reliability

### Column 4

Not started

### Column 5

P1

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

04 Jan 27

### Column 12

async jobs, retries, idempotent consumers
timeouts, retry, circuit breaker concept
Signatures, retries, idempotency, ordering
Retries, dead-letter, at-least-once, idempotent consumers
When/why to decouple, retries, idempotency
Timeouts, retries, circuit-breaker concept, graceful degradation

### Column 13

Design: Email/payment webhook processing
Trade-off: latency vs decoupling
Design: Unreliable payment provider
Trade-off: resilience vs duplicate risk

### Column 15

Queues

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028
S021

### Column 22

148

## Export record 9

### Column 1

SD10

### Column 2

15

### Column 3

Caching

### Column 4

Not started

### Column 5

P1

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

11 Jan 27

### Column 12

what/where/how invalidate
cache-aside, TTL, sessions, rate limits, invalidation
Cache-aside, TTL, invalidation, rate-limit/session patterns
Cache-aside, invalidation, TTL, stale-data trade-offs

### Column 13

Design: Product catalogue cache
Trade-off: freshness vs latency
Add cache with explicit invalidation rule
Cache catalogue endpoint
Optional but useful

### Column 15

Caching

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028
S004
S020

### Column 22

156

## Export record 10

### Column 1

SD12

### Column 2

15

### Column 3

Search

### Column 4

Not started

### Column 5

P2

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

11 Jan 27

### Column 12

DB index vs search service concept

### Column 13

Design: Product/business search
Trade-off: features vs complexity

### Column 15

Search

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028

### Column 22

157

## Export record 11

### Column 1

SD14

### Column 2

16

### Column 3

Rate limiting

### Column 4

Not started

### Column 5

P2

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

18 Jan 27

### Column 12

per key/window algorithms concept
Token bucket concept, per-user/IP policies, backoff

### Column 13

Design: Public API protection
Trade-off: fairness vs simplicity

### Column 15

Rate limiting

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028
S022

### Column 22

171

## Export record 12

### Column 1

SD15

### Column 2

16

### Column 3

File/object storage

### Column 4

Not started

### Column 5

P2

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

18 Jan 27

### Column 12

DB vs object storage, signed URL concept

### Column 13

Design: Product images
Trade-off: security vs convenience

### Column 15

File/object storage

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028

### Column 22

172

## Export record 13

### Column 1

SD16

### Column 2

16

### Column 3

Load balancing

### Column 4

Not started

### Column 5

P1

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

18 Jan 27

### Column 12

distribute requests, health checks
Horizontal vs vertical, load balancing, bottlenecks

### Column 13

Design: Scale API horizontally
Trade-off: stateful vs stateless

### Column 15

Load balancing

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028
S019

### Column 22

173

## Export record 14

### Column 1

SD17

### Column 2

16

### Column 3

Replication

### Column 4

Not started

### Column 5

P2

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

18 Jan 27

### Column 12

read scale / failover concept

### Column 13

Design: Read-heavy catalogue
Trade-off: consistency lag

### Column 15

Replication

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028

### Column 22

174

## Export record 15

### Column 1

SD21

### Column 2

19

### Column 3

Offline sync

### Column 4

Not started

### Column 5

P1

### Column 6

Core

### Column 7

1.00

### Column 8

0.00

### Column 9

08 Feb 27

### Column 12

queue/replay/conflict/idempotency

### Column 13

Design: Offline POS transaction replay
Trade-off: availability vs consistency

### Column 15

Offline sync

### Column 16

System design

### Column 20

AI-free first

### Column 21

S028

### Column 22

194
