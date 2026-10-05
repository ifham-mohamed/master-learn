# System design

[All documents](README.md) · [Original HTML](../../html/System%20design.html)

This is a historical HTML export. Dates, progress, and verification labels are preserved, not live app data or newly verified claims.

## Task index

- [SD05 — Requirements](system-design.md#sd05) · weeks 5–5 · Core
- [SD07 — Data model](system-design.md#sd07) · weeks 5–5 · Core
- [SD13 — Queues, retries and service reliability](system-design.md#sd13) · weeks 14–14 · Core
- [SD10 — Caching](system-design.md#sd10) · weeks 15–15 · Core
- [SD12 — Search](system-design.md#sd12) · weeks 15–15 · Core
- [SD14 — Rate limiting](system-design.md#sd14) · weeks 16–16 · Core
- [SD15 — File/object storage](system-design.md#sd15) · weeks 16–16 · Core
- [SD16 — Load balancing](system-design.md#sd16) · weeks 16–16 · Core
- [SD17 — Replication](system-design.md#sd17) · weeks 16–16 · Core
- [SD21 — Offline sync](system-design.md#sd21) · weeks 19–19 · Core

## Learning workflow

Read the outcome and exercise, explain the theory, implement a small experiment, test it, and save actual results in the existing learning workspace. Respect the recorded AI practice mode. File presence does not prove completion.

<a id="sd05"></a>

## SD05 — Requirements

[Editable learning workspace](../../../learning/system-design/SD05/README.md)

### Task ID

SD05

### Start week

5

### Category

System design

### Work type

Practice

### Task / deliverable

Requirements

### Priority

P0

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

02 Nov 26

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

Functional/non-functional, constraints, scale
Functional/non-functional requirements and constraints

### Exercise / interview prompt

Design: Clarify a booking service
Trade-off: scope vs time

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Merged

### Original source rows

System Design!5
Master Roadmap!54

### Source IDs

S028
S022

### End week

5

### Plan section

Requirements

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W5 + W17–24
Review: W8 + W17–24
W5

### Completion check

_Not recorded in the export._

### Category key

System design|1

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

#### S022 — Technical interviewing

##### Type

Source

##### Topic

Technical interviewing

##### Guidance / change

Problem solving, design, coding, testing; algorithms and security implications

##### Related IDs

S022

##### Source / original location

https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing

##### State / verification

Inherited context; not reverified

<a id="sd07"></a>

## SD07 — Data model

[Editable learning workspace](../../../learning/system-design/SD07/README.md)

### Task ID

SD07

### Start week

5

### Category

System design

### Work type

Practice

### Task / deliverable

Data model

### Priority

P0

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

02 Nov 26

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

entities, keys, constraints
Endpoints, entities, invariants, constraints

### Exercise / interview prompt

Design: POS order + inventory
Trade-off: normalization vs query speed

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Merged

### Original source rows

System Design!7
Master Roadmap!55

### Source IDs

S028
S019

### End week

5

### Plan section

Data model

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W5 + W17–24
Review: W8 + W17–24
W5

### Completion check

_Not recorded in the export._

### Category key

System design|2

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

#### S019 — Software development interview topics

##### Type

Source

##### Topic

Software development interview topics

##### Guidance / change

Coding assessment; programming, DS&A, OOD, databases, distributed computing, OS, internet, AI

##### Related IDs

S019

##### Source / original location

https://amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics

##### State / verification

Inherited context; not reverified

<a id="sd13"></a>

## SD13 — Queues, retries and service reliability

[Editable learning workspace](../../../learning/system-design/SD13/README.md)

### Task ID

SD13

### Start week

14

### Category

System design

### Work type

Practice

### Task / deliverable

Queues, retries and service reliability

### Priority

P1

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

04 Jan 27

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

async jobs, retries, idempotent consumers
timeouts, retry, circuit breaker concept
Signatures, retries, idempotency, ordering
Retries, dead-letter, at-least-once, idempotent consumers
When/why to decouple, retries, idempotency
Timeouts, retries, circuit-breaker concept, graceful degradation

### Exercise / interview prompt

Design: Email/payment webhook processing
Trade-off: latency vs decoupling
Design: Unreliable payment provider
Trade-off: resilience vs duplicate risk

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Merged

### Original source rows

System Design!13
System Design!18
Master Roadmap!42
Master Roadmap!43
Master Roadmap!57
Master Roadmap!60

### Source IDs

S028
S021

### End week

14

### Plan section

Queues

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W14 + W17–24
Review: W16 + W17–24
W19
Review: W20 + W21–24
W14

### Completion check

_Not recorded in the export._

### Category key

System design|3

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

#### S021 — Rebuilding engineering interviews around AI

##### Type

Source

##### Topic

Rebuilding engineering interviews around AI

##### Guidance / change

60-min AI-assisted working session; unfamiliar code, debugging, validation, scope, communication

##### Related IDs

S021

##### Source / original location

https://careersatdoordash.com/blog/doordash-is-rebuilding-its-engineering-interviews-around-ai/

##### State / verification

Inherited context; not reverified

<a id="sd10"></a>

## SD10 — Caching

[Editable learning workspace](../../../learning/system-design/SD10/README.md)

### Task ID

SD10

### Start week

15

### Category

System design

### Work type

Practice

### Task / deliverable

Caching

### Priority

P1

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

11 Jan 27

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

what/where/how invalidate
cache-aside, TTL, sessions, rate limits, invalidation
Cache-aside, TTL, invalidation, rate-limit/session patterns
Cache-aside, invalidation, TTL, stale-data trade-offs

### Exercise / interview prompt

Design: Product catalogue cache
Trade-off: freshness vs latency
Add cache with explicit invalidation rule
Cache catalogue endpoint
Optional but useful

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Merged

### Original source rows

System Design!10
Full-Stack Stack!18
Master Roadmap!31
Master Roadmap!56

### Source IDs

S028
S004
S020

### End week

15

### Plan section

Caching

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W15 + W17–24
Review: W16 + W17–24
W15

### Completion check

_Not recorded in the export._

### Category key

System design|4

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

#### S004 — Developer Skills Report 2025

##### Type

Source

##### Topic

Developer Skills Report 2025

##### Guidance / change

66% prefer practical challenges; early-career hiring lags; backend/React/AI learning signals
Spring Boot leads backend learning priorities; React leads frontend

##### Related IDs

S004

##### Source / original location

https://www.hackerrank.com/reports/developer-skills-report-2025

##### State / verification

Inherited context; not reverified

#### S020 — Developer Survey 2025 — Technology

##### Type

Source

##### Topic

Developer Survey 2025 — Technology

##### Guidance / change

Python growth, Redis growth, Docker jump; React/Next relationships

##### Related IDs

S020

##### Source / original location

https://survey.stackoverflow.co/2025/technology

##### State / verification

Inherited context; not reverified

<a id="sd12"></a>

## SD12 — Search

[Editable learning workspace](../../../learning/system-design/SD12/README.md)

### Task ID

SD12

### Start week

15

### Category

System design

### Work type

Practice

### Task / deliverable

Search

### Priority

P2

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

11 Jan 27

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

DB index vs search service concept

### Exercise / interview prompt

Design: Product/business search
Trade-off: features vs complexity

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Existing

### Original source rows

System Design!12

### Source IDs

S028

### End week

15

### Plan section

Search

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W15 + W17–24
Review: W16 + W17–24

### Completion check

_Not recorded in the export._

### Category key

System design|5

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

<a id="sd14"></a>

## SD14 — Rate limiting

[Editable learning workspace](../../../learning/system-design/SD14/README.md)

### Task ID

SD14

### Start week

16

### Category

System design

### Work type

Practice

### Task / deliverable

Rate limiting

### Priority

P2

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

18 Jan 27

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

per key/window algorithms concept
Token bucket concept, per-user/IP policies, backoff

### Exercise / interview prompt

Design: Public API protection
Trade-off: fairness vs simplicity

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Merged

### Original source rows

System Design!14
Master Roadmap!67

### Source IDs

S028
S022

### End week

16

### Plan section

Rate limiting

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W16 + W17–24
Review: W16 + W17–24
W16

### Completion check

_Not recorded in the export._

### Category key

System design|6

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

#### S022 — Technical interviewing

##### Type

Source

##### Topic

Technical interviewing

##### Guidance / change

Problem solving, design, coding, testing; algorithms and security implications

##### Related IDs

S022

##### Source / original location

https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing

##### State / verification

Inherited context; not reverified

<a id="sd15"></a>

## SD15 — File/object storage

[Editable learning workspace](../../../learning/system-design/SD15/README.md)

### Task ID

SD15

### Start week

16

### Category

System design

### Work type

Practice

### Task / deliverable

File/object storage

### Priority

P2

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

18 Jan 27

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

DB vs object storage, signed URL concept

### Exercise / interview prompt

Design: Product images
Trade-off: security vs convenience

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Existing

### Original source rows

System Design!15

### Source IDs

S028

### End week

16

### Plan section

File/object storage

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W16 + W17–24
Review: W16 + W17–24

### Completion check

_Not recorded in the export._

### Category key

System design|7

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

<a id="sd16"></a>

## SD16 — Load balancing

[Editable learning workspace](../../../learning/system-design/SD16/README.md)

### Task ID

SD16

### Start week

16

### Category

System design

### Work type

Practice

### Task / deliverable

Load balancing

### Priority

P1

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

18 Jan 27

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

distribute requests, health checks
Horizontal vs vertical, load balancing, bottlenecks

### Exercise / interview prompt

Design: Scale API horizontally
Trade-off: stateful vs stateless

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Merged

### Original source rows

System Design!16
Master Roadmap!58

### Source IDs

S028
S019

### End week

16

### Plan section

Load balancing

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W16 + W17–24
Review: W16 + W17–24
W16

### Completion check

_Not recorded in the export._

### Category key

System design|8

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

#### S019 — Software development interview topics

##### Type

Source

##### Topic

Software development interview topics

##### Guidance / change

Coding assessment; programming, DS&A, OOD, databases, distributed computing, OS, internet, AI

##### Related IDs

S019

##### Source / original location

https://amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics

##### State / verification

Inherited context; not reverified

<a id="sd17"></a>

## SD17 — Replication

[Editable learning workspace](../../../learning/system-design/SD17/README.md)

### Task ID

SD17

### Start week

16

### Category

System design

### Work type

Practice

### Task / deliverable

Replication

### Priority

P2

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

18 Jan 27

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

read scale / failover concept

### Exercise / interview prompt

Design: Read-heavy catalogue
Trade-off: consistency lag

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Existing

### Original source rows

System Design!17

### Source IDs

S028

### End week

16

### Plan section

Replication

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W16 + W17–24
Review: W16 + W17–24

### Completion check

_Not recorded in the export._

### Category key

System design|9

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified

<a id="sd21"></a>

## SD21 — Offline sync

[Editable learning workspace](../../../learning/system-design/SD21/README.md)

### Task ID

SD21

### Start week

19

### Category

System design

### Work type

Practice

### Task / deliverable

Offline sync

### Priority

P1

### Status

Not started

### Evidence / result

_Not recorded in the export._

### Next action / blocker

_Not recorded in the export._

### Due date

08 Feb 27

### Scope

Core

### Estimate (h)

1.00

### Actual (h)

0.00

### Confidence 0-5

0

### Done when

queue/replay/conflict/idempotency

### Exercise / interview prompt

Design: Offline POS transaction replay
Trade-off: availability vs consistency

### Prerequisite IDs

_Not recorded in the export._

### Completed on

_Not recorded in the export._

### Review due

_Not recorded in the export._

### AI practice mode

AI-free first

### Origin

Existing

### Original source rows

System Design!21

### Source IDs

S028

### End week

19

### Plan section

Offline sync

### Technical 0-5

_Not recorded in the export._

### Communication 0-5

_Not recorded in the export._

### Mock result

_Not recorded in the export._

### Original schedule / reviews

W19 + W21–24
Review: W20 + W21–24

### Completion check

_Not recorded in the export._

### Category key

System design|10

### Resource details

#### S028 — State of Tech Hiring 2026

##### Type

Source

##### Topic

State of Tech Hiring 2026

##### Guidance / change

Algorithms 43%, real-world 38%, system design 38%, code review 21%, debugging 19%
Algorithms remain common (43%) while real-world scenarios and system design are each 38%; debugging/code review are growing.

##### Related IDs

S028

##### Source / original location

https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/

##### State / verification

Inherited context; not reverified


## Original category sheet details

The linked export can contain view-specific fields and historical values. These are retained separately from the canonical Master Plan task records above.

### Export record 1

**Column 1:** System design tasks

### Export record 2

**Column 1:** Category

**Column 3:** System design

**Column 4:** Tasks

**Column 5:** 10

**Column 6:** Complete

**Column 7:** 0

**Column 8:** Progress

**Column 9:** 0%

### Export record 3

**Column 1:** Linked view. Edit the Master Plan; changes appear here automatically. Use Task ID to find the original row.

### Export record 4

**Column 1:** Shows up to 300 tasks. Order follows the Master Plan.

### Export record 5

**Column 1:** Task ID

**Column 2:** Start week

**Column 3:** Task / deliverable

**Column 4:** Status

**Column 5:** Priority

**Column 6:** Scope

**Column 7:** Estimate (h)

**Column 8:** Actual (h)

**Column 9:** Due date

**Column 10:** Completion check

**Column 11:** Next action / blocker

**Column 12:** Done when

**Column 13:** Exercise / interview prompt

**Column 14:** Prerequisite IDs

**Column 15:** Plan section

**Column 16:** Category

**Column 17:** Evidence / result

**Column 18:** Completed on

**Column 19:** Review due

**Column 20:** AI practice mode

**Column 21:** Source IDs

**Column 22:** Source position

### Export record 6

**Column 1:** SD05

**Column 2:** 5

**Column 3:** Requirements

**Column 4:** Not started

**Column 5:** P0

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 02 Nov 26

**Column 12:** Functional/non-functional, constraints, scale
Functional/non-functional requirements and constraints

**Column 13:** Design: Clarify a booking service
Trade-off: scope vs time

**Column 15:** Requirements

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028
S022

**Column 22:** 61

### Export record 7

**Column 1:** SD07

**Column 2:** 5

**Column 3:** Data model

**Column 4:** Not started

**Column 5:** P0

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 02 Nov 26

**Column 12:** entities, keys, constraints
Endpoints, entities, invariants, constraints

**Column 13:** Design: POS order + inventory
Trade-off: normalization vs query speed

**Column 15:** Data model

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028
S019

**Column 22:** 62

### Export record 8

**Column 1:** SD13

**Column 2:** 14

**Column 3:** Queues, retries and service reliability

**Column 4:** Not started

**Column 5:** P1

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 04 Jan 27

**Column 12:** async jobs, retries, idempotent consumers
timeouts, retry, circuit breaker concept
Signatures, retries, idempotency, ordering
Retries, dead-letter, at-least-once, idempotent consumers
When/why to decouple, retries, idempotency
Timeouts, retries, circuit-breaker concept, graceful degradation

**Column 13:** Design: Email/payment webhook processing
Trade-off: latency vs decoupling
Design: Unreliable payment provider
Trade-off: resilience vs duplicate risk

**Column 15:** Queues

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028
S021

**Column 22:** 148

### Export record 9

**Column 1:** SD10

**Column 2:** 15

**Column 3:** Caching

**Column 4:** Not started

**Column 5:** P1

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 11 Jan 27

**Column 12:** what/where/how invalidate
cache-aside, TTL, sessions, rate limits, invalidation
Cache-aside, TTL, invalidation, rate-limit/session patterns
Cache-aside, invalidation, TTL, stale-data trade-offs

**Column 13:** Design: Product catalogue cache
Trade-off: freshness vs latency
Add cache with explicit invalidation rule
Cache catalogue endpoint
Optional but useful

**Column 15:** Caching

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028
S004
S020

**Column 22:** 156

### Export record 10

**Column 1:** SD12

**Column 2:** 15

**Column 3:** Search

**Column 4:** Not started

**Column 5:** P2

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 11 Jan 27

**Column 12:** DB index vs search service concept

**Column 13:** Design: Product/business search
Trade-off: features vs complexity

**Column 15:** Search

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028

**Column 22:** 157

### Export record 11

**Column 1:** SD14

**Column 2:** 16

**Column 3:** Rate limiting

**Column 4:** Not started

**Column 5:** P2

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 18 Jan 27

**Column 12:** per key/window algorithms concept
Token bucket concept, per-user/IP policies, backoff

**Column 13:** Design: Public API protection
Trade-off: fairness vs simplicity

**Column 15:** Rate limiting

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028
S022

**Column 22:** 171

### Export record 12

**Column 1:** SD15

**Column 2:** 16

**Column 3:** File/object storage

**Column 4:** Not started

**Column 5:** P2

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 18 Jan 27

**Column 12:** DB vs object storage, signed URL concept

**Column 13:** Design: Product images
Trade-off: security vs convenience

**Column 15:** File/object storage

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028

**Column 22:** 172

### Export record 13

**Column 1:** SD16

**Column 2:** 16

**Column 3:** Load balancing

**Column 4:** Not started

**Column 5:** P1

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 18 Jan 27

**Column 12:** distribute requests, health checks
Horizontal vs vertical, load balancing, bottlenecks

**Column 13:** Design: Scale API horizontally
Trade-off: stateful vs stateless

**Column 15:** Load balancing

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028
S019

**Column 22:** 173

### Export record 14

**Column 1:** SD17

**Column 2:** 16

**Column 3:** Replication

**Column 4:** Not started

**Column 5:** P2

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 18 Jan 27

**Column 12:** read scale / failover concept

**Column 13:** Design: Read-heavy catalogue
Trade-off: consistency lag

**Column 15:** Replication

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028

**Column 22:** 174

### Export record 15

**Column 1:** SD21

**Column 2:** 19

**Column 3:** Offline sync

**Column 4:** Not started

**Column 5:** P1

**Column 6:** Core

**Column 7:** 1.00

**Column 8:** 0.00

**Column 9:** 08 Feb 27

**Column 12:** queue/replay/conflict/idempotency

**Column 13:** Design: Offline POS transaction replay
Trade-off: availability vs consistency

**Column 15:** Offline sync

**Column 16:** System design

**Column 20:** AI-free first

**Column 21:** S028

**Column 22:** 194
