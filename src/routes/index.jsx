import { lazy } from 'react';

const Dashboard = lazy(() => import ('../app/admin/(dashboard)/page'));
const Products = lazy(() => import ('../app/admin/(products)/page'));
const Orders = lazy(() => import ('../app/admin/(orders)/page'));
const Customers = lazy(() => import ('../app/admin/(customers)/page'));
const Reviews = lazy(() => import ('../app/admin/(reviews)/page'));
const Settings = lazy(() => import ('../app/admin/(settings)/page'));


const adminRoutes = [
    {
        path: "/admin/",
        name: 'Dashboard',
        element: <Dashboard />
    },
    {
        path: "/admin/products",
        name: 'Products',
        element: <Products />
    },
    {
        path: "/admin/orders",
        name: 'Orders',
        element: <Orders />
    },
    {
        path: "/admin/customers",
        name: 'Customers',
        element: <Customers />
    },
    {
        path: "/admin/reviews",
        name: 'Reviews',
        element: <Reviews />
    },
    {
        path: "/admin/settings",
        name: 'Settings',
        element: <Settings />
    },
]

export { adminRoutes }