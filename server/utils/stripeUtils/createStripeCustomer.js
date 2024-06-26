const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createStripeCustomer = async (customerData) => {
  const { name, email, address } = customerData;
  try {
    const customer = await stripe.customers.create({
      name,
      email,
      address,
    });
    return customer;
  } catch (err) {
    console.error('Error while creating Stripe-customer', err);
    throw err;
  }
};

module.exports = createStripeCustomer;
