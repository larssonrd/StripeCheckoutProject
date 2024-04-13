import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

interface Order {
  orderid: string;
  amount_total: number;
  currency: string;
  orderDate: string;
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  if (user) console.log(user);

  useEffect(() => {
    if (user) {
      const getOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/order/orders/${user.id}`,
            { withCredentials: true }
          );
          const fetchedOrders = response.data.orders;
          setOrders(fetchedOrders);
        } catch (error) {
          console.log(error);
        }
      };

      getOrders();
    }
  }, [user]);

  return (
    <div className='bg-white'>
      <div className='py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
          <div className='mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
              Order history
            </h1>
          </div>
        </div>

        <div className='mt-16'>
          <h2 className='sr-only'>Recent orders</h2>
          <div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
            <div className='mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
              {orders.map((order) => (
                <div
                  key={order.orderid}
                  className='border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border'
                >
                  <div className='flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:p-6'>
                    <dl className='grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
                      <div>
                        <dt className='font-medium text-gray-900'>
                          Order number
                        </dt>
                        <dd className='mt-1 text-gray-500'>
                          {`${order.orderid.slice(
                            0,
                            5
                          )}...${order.orderid.slice(-5)}`}
                        </dd>
                      </div>
                      <div className='hidden sm:block'>
                        <dt className='font-medium text-gray-900'>
                          Date placed
                        </dt>
                        <dd className='mt-1 text-gray-500'>
                          <time dateTime={order.orderDate}>
                            {order.orderDate}
                          </time>
                        </dd>
                      </div>
                      <div>
                        <dt className='font-medium text-gray-900'>
                          Total amount
                        </dt>
                        <dd className='mt-1 font-medium text-gray-900'>
                          {order.amount_total / 100} {order.currency}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
