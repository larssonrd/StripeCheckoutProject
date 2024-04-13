import { Fragment, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import logo from '../assets/logony.png';
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navigation = {
    pages: [
      { name: 'Our products', href: '/' },
      ...(!isLoggedIn
        ? [
            { name: 'Register', href: '/register' },
            { name: 'Login', href: '/login' },
          ]
        : [
            { name: 'My orders', href: '/orders' },
            { name: 'Logout', href: '#', action: handleLogout },
          ]),
    ],
  };

  return (
    <div>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-40 lg:hidden'
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                <div className='flex px-4 pb-2 pt-5'>
                  <button
                    type='button'
                    className='-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as='div' className='mt-2'>
                  <div className='border-b border-gray-200'>
                    <Tab.List className='-mb-px flex space-x-8 px-4'></Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}></Tab.Panels>
                </Tab.Group>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  {navigation.pages.map((page) => {
                    if (page.action) {
                      return (
                        <button
                          key={page.name}
                          onClick={page.action}
                          className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                        >
                          {page.name}
                        </button>
                      );
                    } else {
                      return (
                        <Link
                          key={page.name}
                          to={page.href}
                          className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                        >
                          {page.name}
                        </Link>
                      );
                    }
                  })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className='relative bg-white'>
        <nav
          aria-label='Top'
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
        >
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex flex-1 items-center lg:hidden'>
                <button
                  type='button'
                  className='-ml-2 rounded-md bg-white p-2 text-gray-400'
                  onClick={() => setOpen(true)}
                >
                  <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>

              {/* Flyout menus */}
              <Popover.Group className='hidden lg:block lg:flex-1 lg:self-stretch'>
                <div className='flex h-full space-x-8'>
                  {navigation.pages.map((page) => {
                    if (page.action) {
                      return (
                        <button
                          key={page.name}
                          onClick={page.action}
                          className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                        >
                          {page.name}
                        </button>
                      );
                    } else {
                      return (
                        <Link
                          key={page.name}
                          to={page.href}
                          className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                        >
                          {page.name}
                        </Link>
                      );
                    }
                  })}
                </div>
              </Popover.Group>

              {/* Logo */}
              <Link to='/' className='flex'>
                <img className='h-24 w-auto' src={logo} alt='' />
              </Link>

              <div className='flex flex-1 items-center justify-end'>
                {/* Cart */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <Link
                    to='/cart'
                    className='group -m-2 flex items-center p-2'
                  >
                    <ShoppingBagIcon
                      className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      {items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Header;
