const express = require('express');
const router = express.Router();
const { confirmPaymentAndAddOrderToDB } = require('./order.controller');

router.post('/confirm-order', confirmPaymentAndAddOrderToDB);

module.exports = router;
