const fs = require('fs').promises;
const fetchOrders = require('../../utils/fetchOrders');
const confirmStripePayment = require('../../utils/stripeUtils/confirmStripePayment');

const confirmPaymentAndAddOrderToDB = async (req, res) => {
  const { session_id } = req.query;

  try {
    const paymentConfirmation = await confirmStripePayment(session_id);
    if (paymentConfirmation.confirmed) {
      const orders = await fetchOrders();
      const sessionData = paymentConfirmation.session;

      res
        .status(200)
        .json({
          success: true,
          message: paymentConfirmation.message,
          session: sessionData,
        });
    } else {
      res
        .status(402)
        .json({ success: false, message: paymentConfirmation.message });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { confirmPaymentAndAddOrderToDB };
