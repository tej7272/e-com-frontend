import axios from 'axios'
import { PATHS } from 'routes/paths'
import { adminLogout } from 'store/slices/auth/adminAuthSlice'

const adminAxios = axios.create({
  timeout: 10000,
})

adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      import('store/store').then(({ store }) => {
        store.dispatch(adminLogout())
        window.location.href = PATHS.admin.auth.login
      })
    }
    return Promise.reject(error)
  }
)

export default adminAxios