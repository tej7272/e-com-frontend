import { useEffect, useRef }  from 'react'
import { useDispatch }        from 'react-redux'
import { useLocation }        from 'react-router-dom'
import { fetchAdminInfo, refreshAdminToken }  from 'store/slices/auth/adminAuthSlice'
import { refreshCustomerToken }              from 'store/slices/auth/customerAuthSlice'

const AuthInitializer = () => {
  const dispatch     = useDispatch()
  const { pathname } = useLocation()
  const initialized  = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const init = async () => {
      if (pathname.startsWith('/admin')) {
        const result = await dispatch(refreshAdminToken())
        if (refreshAdminToken.fulfilled.match(result)) {
          dispatch(fetchAdminInfo())
        }
      } else {
        dispatch(refreshCustomerToken())
      }
    }

    init()
  }, [dispatch, pathname])

  return null
}

export default AuthInitializer