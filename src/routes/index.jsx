import { lazy } from 'react';
import { PATHS } from './paths';

const Dashboard = lazy(() => import('pages/admin/dashboard/Page'));
const Configuration = lazy(() => import('pages/admin/configuration/Page'));
const Products = lazy(() => import('pages/admin/products/Page'));
const Orders = lazy(() => import('pages/admin/orders/Page'));
const Customers = lazy(() => import('pages/admin/customers/Page'));
const Reviews = lazy(() => import('pages/admin/reviews/Page'));
const AdminLogin = lazy(() => import('pages/auth/admin/LoginForm'));
const ValidateOtp = lazy(() => import('pages/auth/admin/ValidateOtp'));
const ForgotPassword = lazy(() => import('pages/auth/admin/ForgotPassword'));
const ResetPassword = lazy(() => import('pages/auth/admin/ResetPassword'));

const adminRoutes = [
    { path: PATHS.admin.root,          element: <Dashboard /> },
    { path: PATHS.admin.configuration, element: <Configuration /> },
    { path: PATHS.admin.products,      element: <Products /> },
    { path: PATHS.admin.orders,        element: <Orders /> },
    { path: PATHS.admin.customers,     element: <Customers /> },
    { path: PATHS.admin.reviews,       element: <Reviews /> },
];

const authRoutes = [
    { path: PATHS.admin.auth.login, element: <AdminLogin /> },
    { path: PATHS.admin.auth.validate, element: <ValidateOtp /> },
    { path: PATHS.admin.auth.forgotPassword, element: <ForgotPassword /> },
    { path: PATHS.admin.auth.resetPassword, element: <ResetPassword /> }
]

export { adminRoutes, authRoutes };