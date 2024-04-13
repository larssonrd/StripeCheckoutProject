const fs = require('fs').promises;
const path = require('path');

const fetchOrders = require('../../utils/fetchOrders');
const confirmStripePayment = require('../../utils/stripeUtils/confirmStripePayment');

const confirmPaymentAndAddOrderToDB = async (req, res) => {
  const { session_id } = req.query;

  try {
    const paymentConfirmation = await confirmStripePayment(session_id);
    if (paymentConfirmation.confirmed) {
      const orders = await fetchOrders();
      const sessionData = paymentConfirmation.session;

      const orderExists = orders.some(
        (order) => order.orderid === sessionData.id
      );
      if (orderExists) {
        return res.status(409).json({
          success: false,
          message: 'Order already exists in the database',
        });
      }

      const date = new Date(sessionData.created * 1000).toString();
      const formattedDate = date.split(' ').slice(1, 4).join(' ');

      const newOrder = {
        orderid: sessionData.id,
        amount_total: sessionData.amount_total,
        currency: sessionData.currency,
        customerId: sessionData.customer,
        customer_details: sessionData.customer_details,
        line_items: sessionData.line_items.data,
        orderDate: formattedDate,
        pickupLocation: sessionData.metadata.pickupLocation,
      };

      orders.push(newOrder);

      await fs.writeFile(
        path.join(__dirname, '../../data/orders.json'),
        JSON.stringify(orders, null, 2)
      );

      res.status(200).json({
        success: true,
        message: paymentConfirmation.message,
        order: newOrder,
        session: sessionData,
      });
    } else {
      res
        .status(402)
        .json({ success: false, message: paymentConfirmation.message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOrdersByCustomerId = async (req, res) => {
  const { customerId } = req.params;

  try {
    const orders = await fetchOrders();
    const customerOrders = orders.filter(
      (order) => order.customerId === customerId
    );

    if (customerOrders.length > 0) {
      res.status(200).json({
        success: true,
        orders: customerOrders,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No orders found for this customer',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { confirmPaymentAndAddOrderToDB, getOrdersByCustomerId };
