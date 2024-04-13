const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const confirmStripePayment = async (sessionID) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionID, {
      expand: ['line_items'],
    });

    if (session.payment_status === 'paid') {
      return {
        confirmed: true,
        message: 'Payment successful, order confirmed.',
        session,
      };
    } else {
      return {
        confirmed: false,
        message: 'Payment not successful.',
        session,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      confirmed: false,
      message: `An error occurred: ${err.message}`,
    };
  }
};

module.exports = confirmStripePayment;
