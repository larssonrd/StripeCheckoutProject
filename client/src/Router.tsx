import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderConfirmation from './pages/OrderConfirmation';
import Product from './pages/Product';
import Orders from './pages/Orders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/order-success',
        element: <OrderConfirmation />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
]);

export default router;
