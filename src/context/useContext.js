import { useContext } from 'react'
import { AdminAuthContext } from 'providers/AdminAuthProvider'

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  
  if (!context) {
    return {
      admin:  null,
      loading:  false,
      infoLoading:   false,
      isAuthenticated: false,
      logout:  () => {},
    }
  }

  return context
}