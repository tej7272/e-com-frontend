// routes/admin.routes.jsx
import { lazy } from 'react';

const Dashboard     = lazy(() => import('pages/admin/dashboard/Page'));
const Configuration = lazy(() => import('pages/admin/configuration/Page'));
const Products      = lazy(() => import('pages/admin/products/Page'));
const Orders        = lazy(() => import('pages/admin/orders/Page'));
const Customers     = lazy(() => import('pages/admin/customers/Page'));
const Reviews       = lazy(() => import('pages/admin/reviews/Page'));

const adminRoutes = [
    { path: "/admin/",              element: <Dashboard />,     name: "Dashboard"     },
    { path: "/admin/configuration", element: <Configuration />, name: "Configuration" },
    { path: "/admin/products",      element: <Products />,      name: "Products"      },
    { path: "/admin/orders",        element: <Orders />,        name: "Orders"        },
    { path: "/admin/customers",     element: <Customers />,     name: "Customers"     },
    { path: "/admin/reviews",       element: <Reviews />,       name: "Reviews"       },
];

export { adminRoutes };