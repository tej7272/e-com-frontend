// routes/Routes.jsx
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { adminRoutes } from './index';
import Page404 from 'components/not-found/Page404';

const AllRoutes = () => {
    return (
        <Routes>
            {/* ✅ AdminLayout is the parent, each page is a child */}
            <Route element={<AdminLayout />}>
                {adminRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Route>

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AllRoutes;