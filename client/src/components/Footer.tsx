import { Link } from 'react-router-dom';
import logo from '../assets/logony.png';

const Footer = () => {
  const footerNavigation = {
    products: [{ name: 'Product catalog', href: '/' }],
    customerService: [
      { name: 'Login', href: '/login' },
      { name: 'Register', href: '/register' },
    ],
  };

  return (
    <footer aria-labelledby='footer-heading' className='bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='border-t border-gray-200 py-20'>
          <div className='grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16'>
            {/* Image section */}
            <div className='col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1'>
              <img
                src={logo}
                alt=''
                className='h-24 -mt-14 w-auto md:h-20 md:-mt-20'
              />
            </div>

            {/* Sitemap sections */}
            <div className='col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2'>
              <div className='grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8'>
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Products
                  </h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    {footerNavigation.products.map((item) => (
                      <li key={item.name} className='text-sm'>
                        <Link
                          to={item.href}
                          className='text-gray-500 hover:text-gray-600'
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className='text-sm font-medium text-gray-900'>
                  Customer Service
                </h3>
                <ul role='list' className='mt-6 space-y-6'>
                  {footerNavigation.customerService.map((item) => (
                    <li key={item.name} className='text-sm'>
                      <Link
                        to={item.href}
                        className='text-gray-500 hover:text-gray-600'
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-100 py-10 text-center'>
          <p className='text-sm text-gray-500'>
            &copy; 2024 RandomGoods. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
