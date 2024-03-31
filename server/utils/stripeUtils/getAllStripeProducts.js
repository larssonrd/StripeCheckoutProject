const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getAllStripeProducts = async () => {
  const products = await stripe.prices.list({
    expand: ['data.product'],
  });
  console.log(products);
  return products;
};

module.exports = getAllStripeProducts;
