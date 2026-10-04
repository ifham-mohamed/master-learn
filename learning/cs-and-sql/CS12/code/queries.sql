-- query: inner_join
SELECT c.name, o.id FROM customers c INNER JOIN orders o ON o.customer_id = c.id ORDER BY c.id, o.id;
-- query: left_join
SELECT c.name, o.id FROM customers c LEFT JOIN orders o ON o.customer_id = c.id ORDER BY c.id, o.id;
-- query: no_orders
SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL ORDER BY c.id;
-- query: order_counts
SELECT c.name, COUNT(o.id) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name ORDER BY c.id;
-- query: paid_orders_keep_customers
SELECT c.name, o.id FROM customers c LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'paid' ORDER BY c.id, o.id;
