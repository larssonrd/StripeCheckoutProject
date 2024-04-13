import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../context/CartContext';
import { useEffect, useState } from 'react';

interface VisitingAddress {
  streetName: string;
  streetNumber: string;
  city: string;
}

interface PickupLocation {
  servicePointId: string;
  name: string;
  visitingAddress: VisitingAddress;
}

export default function Cart() {
  const { items, removeItem } = useCart();
  const { user, isLoggedIn } = useAuth();
  const [pickupLocations, setPickupLocations] = useState<PickupLocation[]>(
    []
  );
  const [selectedPickupLocationId, setSelectedPickupLocationId] =
    useState('');

  console.log(isLoggedIn);

  useEffect(() => {
    const fetchPickupLocations = async () => {
      if (isLoggedIn && user?.address?.postal_code) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/postnord/servicepoints?postcode=${user.address.postal_code}`
          );
          setPickupLocations(response.data);
        } catch (error) {
          console.error('Failed to fetch pickup locations', error);
        }
      }
    };

    fetchPickupLocations();
  }, [isLoggedIn, user?.address?.postal_code]);

  const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice(items);

  const handleCheckout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (isLoggedIn) {
        const { data } = await axios.post(
          'http://localhost:3000/api/stripe/create-checkout-session',
          {
            lineItems: items.map((item) => ({
              price: item.price_id,
              quantity: item.quantity,
            })),
            userId: user?.id,
            pickupLocation: selectedPickupLocationId,
          }
        );
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Failed to create checkout session', error);
    }
  };

  if (isLoggedIn) {
    return (
      <div className='bg-white'>
        <main>
          <div className='mx-auto max-w-2xl px-4 py-16 md:pt-10 sm:px-6 sm:py-24 lg:px-0'>
            <h1 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Shopping Cart
            </h1>

            <form className='mt-12'>
              <section aria-labelledby='cart-heading'>
                <ul
                  role='list'
                  className='divide-y divide-gray-200 border-b border-t border-gray-200'
                >
                  {items.map((product) => (
                    <li key={product.price_id} className='flex py-6'>
                      <div className='flex-shrink-0'>
                        <img
                          src={product.imageSrc}
                          className='h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32'
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col sm:ml-6'>
                        <div>
                          <div className='flex justify-between'>
                            <h4 className='text-md'>
                              <a
                                href={product.href}
                                className='font-medium text-gray-700 hover:text-gray-800'
                              >
                                {product.name}
                              </a>
                            </h4>
                            <p className='ml-4 text-md font-medium text-gray-900'>
                              {product.price * product.quantity} SEK
                              <br />
                              <span className='text-xs'>
                                Antal: {product.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className='mt-4 flex flex-1 items-end justify-end'>
                          <div className='ml-4'>
                            <button
                              type='button'
                              className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                              onClick={() => removeItem(product.productId)}
                            >
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              {/* Postnord pickuplocation */}
              {pickupLocations && (
                <section className='mt-4'>
                  <label htmlFor='pickupLocation'>
                    Choose a pickup location:
                  </label>
                  <select
                    id='pickupLocation'
                    name='pickupLocation'
                    value={selectedPickupLocationId}
                    onChange={(e) =>
                      setSelectedPickupLocationId(e.target.value)
                    }
                  >
                    {pickupLocations.map((location, index) => (
                      <option key={index} value={location.servicePointId}>
                        {location.name} -{' '}
                        {location.visitingAddress.streetName}{' '}
                        {location.visitingAddress.streetNumber},{' '}
                        {location.visitingAddress.city}
                      </option>
                    ))}
                  </select>
                </section>
              )}
              {/* Order summary */}
              <section aria-labelledby='summary-heading' className='mt-10'>
                <div>
                  <dl className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <dt className='text-base font-medium text-gray-900'>
                        Subtotal
                      </dt>
                      <dd className='ml-4 text-base font-medium text-gray-900'>
                        {totalPrice} SEK incl. tax
                      </dd>
                    </div>
                  </dl>
                  <p className='mt-1 text-sm text-gray-500'>
                    Shipping calculated at checkout.
                  </p>
                </div>

                <div className='mt-10'>
                  <button
                    onClick={handleCheckout}
                    className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                  >
                    Checkout
                  </button>
                </div>

                <div className='mt-6 text-center text-sm text-gray-500'>
                  <p>
                    or{' '}
                    <a
                      href='/'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Continue Shopping
                      <span aria-hidden='true'> &rarr;</span>
                    </a>
                  </p>
                </div>
              </section>
            </form>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <>
        <div className='flex'>
          <div className='h-full flex-1'>
            <h1 className='text-2xl text-center mt-14'>
              You need to be logged in to be able to order
            </h1>
          </div>
        </div>
      </>
    );
  }
}
