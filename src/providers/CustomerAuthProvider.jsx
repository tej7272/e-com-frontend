// providers/CustomerAuthProvider.jsx
import { createContext, useEffect } from 'react'
import { useDispatch, useSelector }  from 'react-redux'
import { Outlet }                    from 'react-router-dom'
import { refreshCustomerToken, logoutCustomer } from 'store/slices/auth/customerAuthSlice'

export const CustomerAuthContext = createContext(null)

export const CustomerAuthProvider = () => {
  const dispatch = useDispatch()
  const { customer, isAuthenticated, loading } = useSelector(
    (state) => state.customerAuth
  )

  // ✅ Restore session from httpOnly cookie on mount
  useEffect(() => {
    dispatch(refreshCustomerToken())
  }, [dispatch])

  const logout = () => dispatch(logoutCustomer())

  return (
    <CustomerAuthContext.Provider value={{ customer, loading, isAuthenticated, logout }}>
      <Outlet />
    </CustomerAuthContext.Provider>
  )
}