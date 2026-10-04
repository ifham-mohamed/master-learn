# JOINs: customers with and without orders

This complete example demonstrates the learning loop. It is sample work, not a record of your own completion.

## The question

Which customers have orders, and which customers have none? We use three customers: Ada, Lin, and Sam. Ada has two orders, Lin has one, and Sam has none. An order belongs to one customer through `customer_id`.

## Reason about the rows first

An INNER JOIN returns matching customer/order pairs. Ada appears twice, Lin once, and Sam does not appear: **three rows**. A LEFT JOIN preserves every customer, adding NULL order columns when no order matches: **four rows**.

```sql
SELECT c.name, o.id
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
ORDER BY c.id, o.id;
```

| Customer | Order |
| --- | --- |
| Ada | 101 |
| Ada | 102 |
| Lin | 103 |
| Sam | NULL |

To find customers without orders, add `WHERE o.id IS NULL`. The primary key cannot be NULL in an actual order row, so this identifies the unmatched row.

## Two mistakes to investigate

With a LEFT JOIN, `COUNT(*)` counts the preserved row for Sam. `COUNT(o.id)` counts only non-NULL order IDs and returns zero for Sam. Group by the customer's ID and name so customers sharing a name remain separate.

To keep every customer while showing only paid orders, put `o.status = 'paid'` in the ON condition. Putting it in WHERE discards the unmatched customer because NULL does not satisfy that comparison. Predict the output before running both variants.

## Run, compare, explain

1. Read the [dataset](../code/schema.sql) and [five queries](../code/queries.sql).
2. Follow the [run instructions](../code/01-run-example.md).
3. Compare the [recorded results](../results/evidence.md) with your prediction.
4. Read the [example reflection](../notes/example-walkthrough.md), then write your own explanation in your journal.

## Extend the experiment

Add another customer called Ada. Add an order with two line items and predict what a three-table join does to row counts. Try a `NOT EXISTS` version of the no-orders query. Record the actual output and explain any surprise. Do not infer query performance from this tiny dataset.

The lab runs on SQLite. PostgreSQL execution plans and engine-specific behavior require a separate experiment. See the [official PostgreSQL joins tutorial](https://www.postgresql.org/docs/current/tutorial-join.html) for further reading.
