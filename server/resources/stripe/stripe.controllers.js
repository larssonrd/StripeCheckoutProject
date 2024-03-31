const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { lineItems, userId } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      customer: userId,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['SE'],
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1OzxELP7EnXOFVOYBZvjTGJW',
        },
      ],
      automatic_tax: { enabled: true },
      customer_update: {
        shipping: 'auto',
      },
    });

    res.status(200).json({
      msg: 'Session created',
      url: session.url,
      sessionID: session.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCheckoutSession,
};
