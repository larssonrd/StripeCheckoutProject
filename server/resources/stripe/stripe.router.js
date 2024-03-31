const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('./stripe.controllers');

router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
