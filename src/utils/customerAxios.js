// utils/customerAxios.js
import axios from 'axios'
import { setCustomerAccessToken, logoutCustomer } from 'store/slices/auth/customerAuthSlice'

const getStore = () => require('store/store').default

export const customerAxios = axios.create({
  baseURL:         process.env.REACT_APP_BASE_URL,
  withCredentials: true, // ✅ sends httpOnly refresh cookie automatically
  timeout:         10000,
})

let isRefreshing = false
let failedQueue  = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token))
  failedQueue = []
}

// ✅ Attach accessToken from customerAuth slice on every request
customerAxios.interceptors.request.use(
  (config) => {
    const token = getStore().getState().customerAuth.accessToken
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// ✅ On 401 — silent refresh, retry queued requests
customerAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    // Refresh endpoint itself failed → session truly expired
    if (original.url.includes('/customer/auth/refresh')) {
      getStore().dispatch(logoutCustomer())
      return Promise.reject(error)
    }

    // Queue parallel 401s while refresh is in progress
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then(token => {
        original.headers.Authorization = `Bearer ${token}`
        return customerAxios(original)
      }).catch(err => Promise.reject(err))
    }

    original._retry = true
    isRefreshing    = true

    try {
      const { data } = await customerAxios.post('/customer/auth/refresh')
      const newToken  = data.accessToken

      getStore().dispatch(setCustomerAccessToken(newToken))
      processQueue(null, newToken)

      original.headers.Authorization = `Bearer ${newToken}`
      return customerAxios(original)

    } catch (err) {
      processQueue(err)
      getStore().dispatch(logoutCustomer())
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)