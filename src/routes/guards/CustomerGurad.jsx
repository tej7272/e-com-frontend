// routes/guards/CustomerGuard.jsx
import { useSelector }      from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PATHS }            from 'routes/paths'
import PageLoader           from 'components/loading/PageLoader'

const CustomerGuard = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.customerAuth)

  if (loading)          return <PageLoader />
  if (!isAuthenticated) return <Navigate to={PATHS.customer.auth.login} replace />
  return <Outlet />
}

export default CustomerGuard