// routes/paths.js
export const PATHS = {
  admin: {
    root: '/admin/',
    configuration: '/admin/configuration',
    products: '/admin/products',
    orders: '/admin/orders',
    customers: '/admin/customers',
    reviews: '/admin/reviews',
    auth: {
      login: '/admin/auth/login',
      validate: '/admin/auth/validate',
      forgotPassword: '/admin/auth/forgot-password',
      resetPassword: '/admin/auth/reset-password',
    },
  },
  customer: {
    // add later
  },
}