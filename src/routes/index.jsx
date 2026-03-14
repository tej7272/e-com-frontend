// routes/admin.routes.jsx
import { lazy } from 'react';
import { PATHS } from './paths';

const Dashboard     = lazy(() => import('pages/admin/dashboard/Page'));
const Configuration = lazy(() => import('pages/admin/configuration/Page'));
const Products      = lazy(() => import('pages/admin/products/Page'));
const Orders        = lazy(() => import('pages/admin/orders/Page'));
const Customers     = lazy(() => import('pages/admin/customers/Page'));
const Reviews       = lazy(() => import('pages/admin/reviews/Page'));
const AdminLogin = lazy(() => import('pages/auth/admin/LoginForm'));
const ValidateOtp = lazy(() => import('pages/auth/admin/ValidateOtp'));

const adminRoutes = [
    { path: PATHS.admin.root,          element: <Dashboard />,     name: "Dashboard"     },
    { path: PATHS.admin.configuration, element: <Configuration />, name: "Configuration" },
    { path: PATHS.admin.products,      element: <Products />,      name: "Products"      },
    { path: PATHS.admin.orders,        element: <Orders />,        name: "Orders"        },
    { path: PATHS.admin.customers,     element: <Customers />,     name: "Customers"     },
    { path: PATHS.admin.reviews,       element: <Reviews />,       name: "Reviews"       },
];

const authRoutes = [
    { path: PATHS.admin.auth.login, element: <AdminLogin />, name: "Admin login"  },
    { path: PATHS.admin.auth.validate, element: <ValidateOtp />, name: "OTP varification"  }
]

export { adminRoutes, authRoutes };