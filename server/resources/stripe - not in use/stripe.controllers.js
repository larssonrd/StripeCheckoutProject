// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const createCheckoutSession = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: req.body,
//       mode: 'payment',
//       success_url: `${process.env.CLIENT_URL}?success=true`,
//       cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
//       automatic_tax: { enabled: true },
//     });

//     res.status(200).json({ msg: 'Session created', url: session.url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: e.message });
//   }
// };

// const createStripeCustomer = async (req, res) => {
//   const { name, email, address } = req.body;
//   try {
//     const customer = await stripe.customers.create({
//       name,
//       email,
//       address,
//       //   name: 'Jenny Rosen',
//       //   email: 'jennyrosen@example.com',
//       //   address: {
//       //     line1: 'Stockholmsvägen 48',
//       //     postal_code: 54231,
//       //     city: 'Mariestad',
//       //     country: 'Sweden',
//       //   },
//     });
//     res.status(200).json(customer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: e.message });
//   }
// };

// const getAllStripeCustomers = async (req, res) => {
//   const customers = await stripe.customers.list({});
//   res.status(200).json(customers);
// };

// const getAllStripeProducts = async (req, res) => {
//   const products = await stripe.prices.list({
//     expand: ['data.product'],
//   });
//   console.log(products);
//   res.status(200).json(products);
// };

// module.exports = {
//   createCheckoutSession,
//   getAllStripeProducts,
//   createStripeCustomer,
//   getAllStripeCustomers,
// };
