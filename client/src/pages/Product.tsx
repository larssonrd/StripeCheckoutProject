import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

interface IProduct {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  description: string;
  productId: string;
}

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { products } = useProducts();
  const { addItem } = useCart();

  useEffect(() => {
    const productInContext = products.find(
      (prod) => prod.productId === id
    );
    if (productInContext) {
      setProduct(productInContext);
      setIsLoading(false);
    } else {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get<IProduct>(
            `http://localhost:3000/api/products/${id}`
          );
          setProduct(response.data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, products]);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (product) {
      addItem({
        price_id: product.id,
        imageSrc: product.imageSrc,
        name: product.name,
        price: product.price,
        href: `/product/${product.productId}`,
        productId: product.productId,
        quantity: 1,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {/* Image gallery */}
          <Tab.Group as='div' className='flex flex-col-reverse'>
            <Tab.Panels className='aspect-h-1 aspect-w-1 w-full'>
              <Tab.Panel key={product.imageSrc}>
                <img
                  src={product.imageSrc}
                  className='h-full w-full object-cover object-center sm:rounded-lg'
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              {product.name}
            </h1>

            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-gray-900'>
                {product.price} SEK
              </p>
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>

              <div
                className='space-y-6 text-base text-gray-700'
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className='mt-6'>
              <div className='mt-10 flex'>
                <button
                  className='flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
