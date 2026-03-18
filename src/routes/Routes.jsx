// routes/Routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { adminRoutes, adminAuthRoutes, customerAuthRoutes, customerRoutes } from './index';
import Page404 from 'components/not-found/Page404';
import AuthLayout from '../layouts/AuthLayout';
import { AdminAuthProvider } from 'providers/AdminAuthProvider';
import AdminGuard from './guards/AdminGuard';
import GuestGuard from './guards/GuestGuard';
import { PATHS } from './paths';
import { CustomerAuthProvider } from 'providers/CustomerAuthProvider';
import CustomerGuard from './guards/CustomerGurad';
import CustomerGuestGuard from './guards/CustomerGuestGuard';
import CustomerLayout from 'layouts/CustomerLayout';

const AllRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminAuthProvider />}>
                <Route element={<AdminGuard />}>
                    <Route element={<AdminLayout />}>
                        {adminRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Route>
                </Route>
            </Route> 

            <Route element={<GuestGuard />}>
                <Route element={<AuthLayout />}>
                    {adminAuthRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>
            </Route>

             {/* ——— CUSTOMER ——— */}
            <Route element={<CustomerAuthProvider />}>
                <Route element={<CustomerGuard />}>
                <Route element={<CustomerLayout />}>
                    {customerRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                    ))}
                </Route>
                </Route>
            </Route>

            <Route element={<CustomerGuestGuard />}>
                {customerAuthRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
                ))}
            </Route>

            <Route path="/" element={<Navigate to={PATHS.admin.auth.login} replace />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AllRoutes;