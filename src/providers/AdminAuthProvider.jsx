import { createContext, useEffect } from 'react'
import { useDispatch, useSelector }  from 'react-redux'
import { Outlet } from 'react-router-dom'
import { adminLogout, fetchAdminInfo } from 'store/slices/auth/adminAuthSlice'

export const AdminAuthContext = createContext(null)

export const AdminAuthProvider = () => {
  const dispatch = useDispatch()
  const { admin, token, isAuthenticated, loading } = useSelector(
    (state) => state.adminAuth
  )

  useEffect(() => {
    if (token) {
      dispatch(fetchAdminInfo())
    }
  }, [token, dispatch])

  const logout = () => dispatch(adminLogout())

  return (
    <AdminAuthContext.Provider value={{
      admin,
      loading,
      isAuthenticated,
      logout,
    }}>
      <Outlet />
    </AdminAuthContext.Provider>
  )
}