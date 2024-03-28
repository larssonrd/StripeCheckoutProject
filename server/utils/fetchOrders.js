const fs = require('fs').promises;

const fetchOrders = async () => {
  const data = await fs.readFile('./data/orders.json');
  const orders = JSON.parse(data);
  return orders;
};

module.exports = fetchOrders;
