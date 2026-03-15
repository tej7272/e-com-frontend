import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from '../paths'

const GuestGuard = () => {
  const { isAuthenticated } = useSelector((state) => state.adminAuth)
  if (isAuthenticated) return <Navigate to={PATHS.admin.root} replace />
  return <Outlet />
}

export default GuestGuard