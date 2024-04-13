const initStripe = require('../../stripe');

const getAllStripeProducts = async () => {
  try {
    const stripe = initStripe();
    const products = await stripe.prices.list({
      expand: ['data.product'],
      limit: 50,
    });
    return products.data;
  } catch (err) {
    console.error(err);
  }
};

module.exports = getAllStripeProducts;
