import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import adminAxios from 'utils/adminAxios'
import { apiEndPoints } from 'utils/api-endpoints'
import { handlePending, handleRejected } from 'utils/sliceHelper'
// import { adminUserInfoApi }  from 'api/admin/auth.api'

// ─── fetch user info on app load ──────────────────────────────
export const fetchAdminInfo = createAsyncThunk(
  'adminAuth/fetchInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminAxios.get(apiEndPoints.admin.auth.adminInfo)
      return data.admin
    } catch (err) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const adminUserLogin = createAsyncThunk(
    "auth/admin-login",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await axios.post(apiEndPoints.admin.auth.login, payload);
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Something went wrong! please try again after some time",
                errors: data?.errors || null
            })

        }
    }
)

export const validateOtp = createAsyncThunk(
    "auth/admin-validate",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await axios.post(apiEndPoints.admin.auth.validate, payload);
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "OTP verification failed!",
                errors: data?.errors || null
            })

        }
    }
)

export const forgotAdminPassword = createAsyncThunk(
    "auth/admin-forgot-password",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await axios.post(apiEndPoints.admin.auth.forgotPassword, payload);
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Forgot password failed!",
                errors: data?.errors || null
            })

        }
    }
)

export const resetAdminPassword = createAsyncThunk(
    "auth/admin-reset-password",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await axios.post(apiEndPoints.admin.auth.resetPassword, payload);
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Reset password failed!",
                errors: data?.errors || null
            })

        }
    }
)

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    otpEmail: "",
    token: localStorage.getItem('adminToken') || null,
    admin: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    adminSetCredentials: (state, action) => {
      state.token           = action.payload.token
      state.admin           = action.payload.admin
      state.isAuthenticated = true
      localStorage.setItem('adminToken', action.payload.token)
    },
    adminLogout: (state) => {
      state.token           = null
      state.admin           = null
      state.isAuthenticated = false
      localStorage.removeItem('adminToken')
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(adminUserLogin.pending, handlePending)
        .addCase(adminUserLogin.fulfilled, (state, action) => {
            const {email, message} = action.payload;
            state.otpEmail = email
            state.loading = false
            toast.success(message)
        })
        .addCase(adminUserLogin.rejected, handleRejected)


        .addCase(validateOtp.pending, handlePending)
        .addCase(validateOtp.fulfilled, (state, action) => {
            const {admin, message, token} = action.payload;
            state.admin = admin;
            state.token = token;
            localStorage.setItem('adminToken', token)
            toast.success(message);
        })
        .addCase(validateOtp.rejected, handleRejected)


        .addCase(forgotAdminPassword.pending, handlePending)
        .addCase(forgotAdminPassword.fulfilled, (state, action) => {
            const { message } = action.payload;
            toast.success(message);
        })
        .addCase(forgotAdminPassword.rejected, handleRejected)


        .addCase(resetAdminPassword.pending, handlePending)
        .addCase(resetAdminPassword.fulfilled, (state, action) => {
            const { message } = action.payload;
            toast.success(message);
        })
        .addCase(resetAdminPassword.rejected, handleRejected)



        .addCase(fetchAdminInfo.pending, handlePending)
        .addCase(fetchAdminInfo.fulfilled, (state, action) => {
            state.admin           = action.payload
            state.isAuthenticated = true
            state.loading         = false
        })
        .addCase(fetchAdminInfo.rejected, (state) => {
            state.token           = null
            state.admin           = null
            state.isAuthenticated = false
            state.loading         = false
            localStorage.removeItem('adminToken')
        })
  },
})

export const { adminSetCredentials, adminLogout } = adminAuthSlice.actions
export default adminAuthSlice.reducer