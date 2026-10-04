CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  status TEXT NOT NULL
);
INSERT INTO customers VALUES (1, 'Ada'), (2, 'Lin'), (3, 'Sam');
INSERT INTO orders VALUES (101, 1, 'paid'), (102, 1, 'pending'), (103, 2, 'paid');
