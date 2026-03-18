// providers/AuthInitializer.jsx
import { useEffect }            from 'react'
import { useDispatch }          from 'react-redux'
import { useLocation }          from 'react-router-dom'
import { refreshAdminToken }    from 'store/slices/auth/adminAuthSlice'
import { refreshCustomerToken } from 'store/slices/auth/customerAuthSlice'

const AuthInitializer = () => {
  const dispatch     = useDispatch()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      // ✅ Only fire admin refresh on admin routes
      dispatch(refreshAdminToken())
    } else {
      // ✅ Only fire customer refresh on customer routes
      dispatch(refreshCustomerToken())
    }
  }, []) // ← runs once on mount only

  return null
}

export default AuthInitializer