const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getAllStripeProducts = async (req, res) => {
  const products = await stripe.prices.list({
    expand: ['data.product'],
  });
  console.log(products);
  res.status(200).json(products);
};

module.exports = getAllStripeProducts;
