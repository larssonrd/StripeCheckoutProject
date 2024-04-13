import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface CustomerDetails {
  address: {
    city: string;
    country: string;
    line1: string;
    postal_code: string;
  };
  email: string;
  name: string;
  phone: string | null;
}

interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null | number;
  nickname: string | null;
  product: string;
  recurring: null | object;
  tax_behavior: string;
  tiers_mode: null | string;
  transform_quantity: null | object;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

interface LineItem {
  id: string;
  object: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  price: Price;
  quantity: number;
}

interface Order {
  orderid: string;
  amount_total: number;
  currency: string;
  customer_details: CustomerDetails;
  line_items: LineItem[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  order: Order;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getSessionId = (): string | null => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('session_id');
  };

  const fetchOrderConfirmation = async () => {
    const sessionId = getSessionId();
    if (!sessionId) {
      setErrorMessage('Session ID is missing.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post<ApiResponse>(
        `http://localhost:3000/api/order/confirm-order?session_id=${sessionId}`,
        {},
        { withCredentials: true }
      );
      setOrderData(response.data);
    } catch (error) {
      console.error('Error fetching order confirmation:', error);
      setErrorMessage('Failed to confirm order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderConfirmation();
  }, []);

  if (loading) {
    return (
      <div className='text-center text-2xl py-10'>
        Please wait while we confirm your order...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='text-red-500 text-center py-10'>{errorMessage}</div>
    );
  }

  if (!orderData) {
    return (
      <div className='text-center text-2xl py-10'>
        No order data available.
      </div>
    );
  }

  console.log(orderData);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='max-w-xl'>
          <h1 className='text-base font-medium text-indigo-600'>
            Payment successful
          </h1>
          <p className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            Thanks for ordering.
          </p>
          <p className='mt-2 text-base text-gray-500'>
            We appreciate your order. Your payment was successful, and your
            total was {(orderData.order.amount_total / 100).toFixed(2)}{' '}
            SEK.
          </p>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmation;
