import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './hooks/useAuth';

const ProductDisplay = ({ handleCheckout }) => (
  <section>
    <div className='product'>
      <img
        src='https://i.imgur.com/EHyR2nP.png'
        alt='The cover of Stubborn Attachments'
      />
      <div className='description'>
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <button onClick={handleCheckout}>Checkout</button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/stripe/create-checkout-session',
        {
          lineItems: [
            { price: 'price_1OzKtgP7EnXOFVOYoOGsCjXZ', quantity: 1 },
            { price: 'price_1OzKtfP7EnXOFVOYsbIqfRp8', quantity: 2 },
          ],
          userId: 'cus_PpobnE7pd9Xt4c', // ska hämtas från context
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      window.location.href = data.url;
    } catch (error) {
      console.error('Failed to create checkout session', error);
      setMessage('Failed to initiate checkout process. Please try again.');
    }
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleCheckout={handleCheckout} />
  );
}
