// routes/Routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { adminRoutes, authRoutes } from './index';
import Page404 from 'components/not-found/Page404';
import AuthLayout from '../layouts/AuthLayout';
import { AdminAuthProvider } from 'providers/AdminAuthProvider';
import AdminGuard from './guards/AdminGuard';
import GuestGuard from './guards/GuestGuard';
import { PATHS } from './paths';

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
                    {authRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>
            </Route>

            <Route path="/" element={<Navigate to={PATHS.admin.auth.login} replace />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AllRoutes;