const express = require('express');
const router = express.Router();
const {
  confirmPaymentAndAddOrderToDB,
  getOrdersByCustomerId,
} = require('./order.controller');

router
  .post('/confirm-order', confirmPaymentAndAddOrderToDB)
  .get('/orders/:customerId', getOrdersByCustomerId);

module.exports = router;
