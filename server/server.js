require('dotenv').config();

const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const app = express();

const authRouter = require('./resources/auth/auth.router');
const stripeRouter = require('./resources/stripe/stripe.router');
const orderRouter = require('./resources/order/order.router');
const productsRouter = require('./resources/products/products.router');
const postnordRouter = require('./resources/postnord/postnord.router');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(
  cookieSession({
    secret: 'kdsaodasdl',
    maxAge: 1000 * 60 * 60, // 1 hour
  })
);

app.use('/api/auth', authRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/order', orderRouter);
app.use('/api/products', productsRouter);
app.use('/api/postnord', postnordRouter);

app.listen(3000, () => {
  console.log('Server is up and running...');
});
