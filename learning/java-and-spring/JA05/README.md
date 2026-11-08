<!-- Managed by export_warehouse_plan.py -->

# JA05 — Syntax + object model

Week 1 · Core · Warehouse checkpoint B01

Before you begin, complete G02.


## Review and learn

String and int, Scanner line input, parsing, conditionals, loops, methods, primitives and references.

## Do the work

Write a terminal menu to create and find one shipment. Ask for reference, destination, SKU and quantity. Work through the source drills as small input and method variations.

## Pass check

A valid create and lookup work. Blank input and non-numeric or nonpositive quantities recover without a crash. Explain pass-by-value using your own code.


## Build it in small steps

1. Open `projects/warehouse-dispatch/` in your editor. Run `java -version` and `javac -version`. Create `ShipmentCli.java` with a `main` method and print a menu. From that folder, run `javac ShipmentCli.java` followed by `java ShipmentCli`. Keep the first version in a single file.
2. Read one line per prompt with `Scanner`. Use `String` for the reference, destination and SKU. Convert the quantity with `Integer.parseInt` and handle `NumberFormatException`. Reject blank required fields and quantities below one before storing anything.
3. Add a loop for Create, Find and Exit. Store one shipment in memory. A lookup returns it only when the reference text matches. Compare strings by value with `equals`. Reject a duplicate reference and give a clear message for an unknown reference. A second distinct shipment can wait until you introduce collections.
4. Extract one small method, such as checking whether an input is a valid quantity. Use its inputs and return value to explain what the caller owns. Java passes values to methods. When the value is a reference, the method receives a copy of that reference.

## Read only what you need for each step

- [First steps in Java](https://dev.java/learn/first-steps/) for the source file, compiler and launch command.
- [Java language basics](https://dev.java/learn/language/constructs/basics/) for variables, operators, conditions and loops.
- [Scanner](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html#nextLine()) for reading a line and checking for more input.
- [Integer.parseInt](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html#parseInt(java.lang.String)) for parsing whole numbers and recognizing invalid input.
- [Classes and Objects](https://dev.java/learn/language/oop/classes-objects/) for method parameters and pass-by-value. Move to constructors and object boundaries in JA06.

## Try these checks yourself

Use `SHP-001`, `Colombo`, `BOX-42` and `3` as synthetic input. Write your own expected results before running each set.

| Check | Inputs to try |
| --- | --- |
| Menu and lookup | Create, find `SHP-001`, find an unknown reference, choose an invalid menu option, exit. |
| Text fields | Blank reference, blank destination, blank SKU, a whitespace-only value, duplicate reference. |
| Quantity | `1`, `0`, `-1`, `abc`, `3.5`, a number above the `int` range, and valid input after a rejected value. |
| Method reasoning | Trace a primitive argument, trace an object reference argument, and explain what happens when a parameter is reassigned. |

Save your actual command, one successful lookup, and one rejected input in the log. Then re-run a check without looking at your notes. Move to JA06 when you can explain the menu loop, validation and method behavior in your own words.

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step. Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/java-and-spring.md#ja05)
