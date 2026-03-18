// adminAxios.js

import axios from 'axios'
import { setAccessToken, logoutAdminAccount } from 'store/slices/auth/adminAuthSlice'

// ❌ REMOVE THIS — causes the circular dep
// import store from 'store/store'

// ✅ Lazy getter — store is accessed only when interceptors actually run
const getStore = () => require('store/store').default

export const adminAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  timeout: 10000,
})

let isRefreshing = false
let queue = []

const processQueue = (error, token = null) => {
  queue.forEach(p => error ? p.reject(error) : p.resolve(token))
  queue = []
}

// ✅ Use getStore() instead of store
adminAxios.interceptors.request.use(
  (config) => {
    const token = getStore().getState().adminAuth.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

adminAxios.interceptors.response.use(
  res => res,
  async (error) => {
    const original = error.config

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    if (original.url.includes('/auth/refresh')) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject })
      }).then(token => {
        original.headers.Authorization = `Bearer ${token}`
        return adminAxios(original)
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      const { data } = await adminAxios.post('/auth/refresh')

      getStore().dispatch(setAccessToken(data.accessToken))
      processQueue(null, data.accessToken)

      original.headers.Authorization = `Bearer ${data.accessToken}`
      return adminAxios(original)

    } catch (err) {
      processQueue(err)
      getStore().dispatch(logoutAdminAccount()) 
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)

export const apiEndPoints = {
  admin: {
    getFormConfig: '/form-config',
    auth: {
      login:  '/auth/login',
      validate: '/auth/validate',
      adminInfo: '/auth/user-info',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword:  '/auth/reset-password',
    },
    configuration: {
      category:    '/configuration/category',
      sizeGroup:   '/configuration/size-group',
      subCategory: '/configuration/sub-category',
      brand:       '/configuration/brand',
      color:       '/configuration/color',
    },
  },
}