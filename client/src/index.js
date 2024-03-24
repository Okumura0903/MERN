import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        elemnt: <Home />,
      },
      // {
      //   path: 'memo',
      //   elemnt: <Memo />,
      // },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
