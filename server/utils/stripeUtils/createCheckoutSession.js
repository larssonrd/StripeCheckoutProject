const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
      automatic_tax: { enabled: true },
    });

    res.status(200).json({ msg: 'Session created', url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: e.message });
  }
};

module.exports = createCheckoutSession;
