import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from 'routes/paths'
import PageLoader from 'components/loading/PageLoader'

const AdminGuard = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.adminAuth)
  if (loading) return <PageLoader />
  if (!isAuthenticated) return <Navigate to={PATHS.admin.auth.login} replace />
  return <Outlet />
}

export default AdminGuard