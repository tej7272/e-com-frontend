// routes/Routes.jsx
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { adminRoutes, authRoutes } from './index';
import Page404 from 'components/not-found/Page404';
import AuthLayout from '../layouts/AuthLayout';

const AllRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                {adminRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Route>

            <Route element={<AuthLayout />}>
                {authRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Route>

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AllRoutes;