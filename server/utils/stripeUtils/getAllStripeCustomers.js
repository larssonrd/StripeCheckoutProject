const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getAllStripeCustomers = async (req, res) => {
  const customers = await stripe.customers.list({});
  res.status(200).json(customers);
};

module.exports = getAllStripeCustomers;
