require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// routers
// const stripeRouter = require('./resources/stripe/stripe.router');
const authRouter = require('./resources/auth/auth.router');

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

// app.use('/stripe', stripeRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is up and running...');
});
