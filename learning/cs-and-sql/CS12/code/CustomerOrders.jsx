// Illustrative display of the LEFT JOIN output. Use in a separate React app.
export default function CustomerOrders() {
  const rows = [['Ada', 101], ['Ada', 102], ['Lin', 103], ['Sam', null]];
  return (
    <table>
      <caption>Customers and their orders</caption>
      <thead><tr><th scope="col">Customer</th><th scope="col">Order</th></tr></thead>
      <tbody>{rows.map(([name, order]) => (
        <tr key={order ?? `no-order-${name}`}><td>{name}</td><td>{order ?? 'No orders'}</td></tr>
      ))}</tbody>
    </table>
  );
}
