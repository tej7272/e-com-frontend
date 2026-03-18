import { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { logoutAdminAccount } from 'store/slices/auth/adminAuthSlice'

export const AdminAuthContext = createContext(null)

export const AdminAuthProvider = () => {
  const dispatch = useDispatch()
  const { admin, isAuthenticated, loading } = useSelector(
    (state) => state.adminAuth
  )

  const logout = () => dispatch(logoutAdminAccount())

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