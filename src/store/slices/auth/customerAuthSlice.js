// store/slices/auth/customerAuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getCustomerAxios = () => require('utils/customerAxios').customerAxios

export const refreshCustomerToken = createAsyncThunk(
  'customerAuth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getCustomerAxios().post('/customer/auth/refresh')
      return data.accessToken
    } catch (err) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

const customerAuthSlice = createSlice({
  name: 'customerAuth',
  initialState: {
    customer:        null,
    accessToken:     null,
    isAuthenticated: false,
    loading:         true,  // ✅ true by default — prevents flash of login on refresh
    error:           null,
  },
  reducers: {
    setCustomerAccessToken(state, action) {
      state.accessToken     = action.payload
      state.isAuthenticated = true
    },
    setCustomer(state, action) {
      state.customer = action.payload
    },
    logoutCustomer(state) {
      state.customer        = null
      state.accessToken     = null
      state.isAuthenticated = false
      state.loading         = false
      state.error           = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshCustomerToken.pending, (state) => {
        state.loading = true
      })
      .addCase(refreshCustomerToken.fulfilled, (state, action) => {
        state.accessToken     = action.payload
        state.isAuthenticated = true
        state.loading         = false
        state.error           = null
      })
      .addCase(refreshCustomerToken.rejected, (state) => {
        state.accessToken     = null
        state.customer        = null
        state.isAuthenticated = false
        state.loading         = false
      })
  },
})

export const {
  setCustomerAccessToken,
  setCustomer,
  logoutCustomer,
} = customerAuthSlice.actions

export default customerAuthSlice.reducer