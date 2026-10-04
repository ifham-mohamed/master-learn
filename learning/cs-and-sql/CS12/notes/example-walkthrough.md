# Example reflection

This is a sample explanation. Use `journal.md` for your own learning record.

**Prediction:** An INNER JOIN gives three rows and a LEFT JOIN gives four because Sam has no orders.

**Observation:** The executed output matches those counts. Ada appears twice because a join produces matching pairs, not one row per customer.

**Mistake to avoid:** Counting all preserved rows would give Sam a count of one. Counting the non-NULL order ID gives zero.

**Next experiment:** Move the paid-order filter from ON into WHERE and explain why Sam disappears. Save the changed SQL under a new filename and record its output before drawing a conclusion.

[Open the results](../results/evidence.md)
