// providers/AuthInitializer.jsx
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { refreshAdminToken } from 'store/slices/auth/adminAuthSlice'
import { refreshCustomerToken } from 'store/slices/auth/customerAuthSlice'

const AuthInitializer = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      dispatch(refreshAdminToken())
    } else {
      dispatch(refreshCustomerToken())
    }
  }, [])

  return null
}

export default AuthInitializer