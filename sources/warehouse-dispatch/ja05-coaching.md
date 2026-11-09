## Build it in small steps

1. Open `projects/warehouse-dispatch/` in your editor. Run `java -version` and `javac -version`. Create `ShipmentCli.java` with a `main` method and print a menu. From that folder, run `javac ShipmentCli.java` followed by `java ShipmentCli`. Keep the first version in a single file.
2. Read one line per prompt with `Scanner`. Use `String` for the reference, destination and SKU. Convert the quantity with `Integer.parseInt` and handle `NumberFormatException`. Reject blank required fields and quantities below one before storing anything.
3. Add a loop for Create, Find and Exit. Store one shipment in memory. A lookup returns it only when the reference text matches. Compare strings by value with `equals`. Reject a duplicate reference and give a clear message for an unknown reference. A second distinct shipment can wait until you introduce collections.
4. Extract one small method, such as checking whether an input is a valid quantity. Use its inputs and return value to explain what the caller owns. Java passes values to methods. When the value is a reference, the method receives a copy of that reference.

## Read only what you need for each step

- Create, compile and run a single source file. [First steps in Java](https://dev.java/learn/first-steps/)
- Review variables, operators, conditions and loops as you write the menu. [Java language basics](https://dev.java/learn/language/constructs/basics/)
- Read a line and check for more input. [Scanner](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html#nextLine())
- Parse whole numbers and recognize invalid input. [Integer.parseInt](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html#parseInt(java.lang.String))
- Trace an argument into a method and explain pass-by-value. [Classes and Objects](https://dev.java/learn/language/oop/classes-objects/)
- Predict the output of a quick parsing or method drill. Try it in the shell, then run the input checks in the terminal app. [JShell](https://dev.java/learn/first-steps/first-java-code/jshell-tool/)

## Try 20 short checks

Use `SHP-001`, `Colombo`, `BOX-42` and `3` as synthetic input. Write your own expected results before running each set.

| Check | Inputs to try |
| --- | --- |
| Menu and lookup | Create, find `SHP-001`, find an unknown reference, choose an invalid menu option, exit. |
| Text fields | Blank reference, blank destination, blank SKU, a whitespace-only value, duplicate reference. |
| Quantity | `1`, `0`, `-1`, `abc`, `3.5`, a number above the `int` range, and valid input after a rejected value. |
| Method reasoning | Trace a primitive argument, trace an object reference argument, and explain what happens when a parameter is reassigned. |

Save your actual command, one successful lookup, and one rejected input in the log. Repeat a check without looking at your notes. When you can explain the menu loop, validation and method behavior, move on to constructors and object boundaries. [JA06](../JA06/README.md)
