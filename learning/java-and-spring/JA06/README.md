<!-- Managed by export_warehouse_plan.py -->

# JA06 — OOP

Week 1 · Core · Warehouse checkpoint [B01](../../projects/B01/README.md)

Before you begin, complete [G02](../../engineering/G02/README.md), [JA05](../../java-and-spring/JA05/README.md).

## Review and learn

Encapsulation, constructors, composition, interfaces, and when inheritance helps.

## Do the work

Separate the menu from Shipment and ShipmentService. Model allowed transitions and add an in-memory collection when a second shipment is needed.

## Pass check

The terminal still works. Tests reject duplicate references and illegal transitions. Explain why you used composition.

## Read and practice

- Review the relevant language feature and trace what a shipment object can expose or change. [Dev.java object-oriented programming](https://dev.java/learn/language/oop/)

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row 11. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

> encapsulation, abstraction, inheritance, polymorphism, composition\
> Explain each and when composition is preferable\
> Apply principles without overengineering\
> Encapsulation, composition, interfaces, SOLID trade-offs\
> Model domains with classes/interfaces; composition, immutability, dependency boundaries

### Exercise / interview prompt

> model order/payment domain\
> Interview: composition vs inheritance?\
> Interview: Composition vs inheritance?\
> Interview: Which SOLID principle is violated here?\
> Refactor a service using composition

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja06)
