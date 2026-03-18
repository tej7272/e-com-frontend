import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { adminAxios, apiEndPoints } from 'utils/adminAxios'
import { handlePending, handleRejected } from 'utils/sliceHelper'



export const fetchAdminInfo = createAsyncThunk(
  'adminAuth/fetchInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminAxios.get(apiEndPoints.admin.auth.adminInfo)
      return data.admin
    } catch (err) {
        console.log('BASE URL:', adminAxios.defaults.baseURL)
    console.log('WITH CREDENTIALS:', adminAxios.defaults.withCredentials)
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const adminUserLogin = createAsyncThunk(
    "auth/admin-login",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await adminAxios.post(apiEndPoints.admin.auth.login, payload);
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
            const res = await adminAxios.post(apiEndPoints.admin.auth.validate, payload);
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
    "auth/admin-forgot",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await adminAxios.post(apiEndPoints.admin.auth.forgotPassword, payload);
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
    "auth/admin-reset",
    async (payload, {rejectWithValue}) => {
        try{
            const res = await adminAxios.post(apiEndPoints.admin.auth.resetPassword, payload);
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


export const refreshAdminToken = createAsyncThunk(
  'auth/refresh-access-token',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await adminAxios.post(apiEndPoints.admin.auth.refresh)
      dispatch(setAccessToken(data.accessToken))
      dispatch(fetchAdminInfo())
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data)
    }
  }
)


export const logoutAdminAccount = createAsyncThunk(
    "auth/admin-logout",
    async (_, {rejectWithValue}) => {
        try{
            const res = await adminAxios.post(apiEndPoints.admin.auth.logout);
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Logout failed!",
                errors: data?.errors || null
            })
        }
    }
)

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    otpEmail: "",
    admin: null,
    accessToken: null,
    isAuthenticated: false,
    loading: true,
  },
  reducers: {
    adminSetCredentials: (state, action) => {
        state.admin = action.payload.admin
        state.isAuthenticated = true
    },
    setAccessToken: (state, action) => {
        state.accessToken = action.payload
  }
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
            const {admin, message, accessToken} = action.payload;
            state.admin = admin;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            state.loading = false;
            toast.success(message);
        })
        .addCase(validateOtp.rejected, handleRejected)


        .addCase(forgotAdminPassword.pending, handlePending)
        .addCase(forgotAdminPassword.fulfilled, (state, action) => {
            const { message } = action.payload;
            state.loading = false;
            toast.success(message);
        })
        .addCase(forgotAdminPassword.rejected, handleRejected)


        .addCase(resetAdminPassword.pending, handlePending)
        .addCase(resetAdminPassword.fulfilled, (state, action) => {
            const { message } = action.payload;
            state.loading = false;
            toast.success(message);
        })
        .addCase(resetAdminPassword.rejected, handleRejected)



        .addCase(fetchAdminInfo.pending, handlePending)
        .addCase(fetchAdminInfo.fulfilled, (state, action) => {
            state.admin = action.payload
            state.isAuthenticated = true
            state.loading = false
        })
        .addCase(fetchAdminInfo.rejected, (state) => {
            state.admin = null
            state.isAuthenticated = false
            state.loading = false
        })


        .addCase(refreshAdminToken.pending, handlePending)
        .addCase(refreshAdminToken.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(refreshAdminToken.rejected, (state) => {
            state.admin           = null
            state.accessToken     = null
            state.isAuthenticated = false
            state.loading         = false
        })


        .addCase(logoutAdminAccount.pending, handlePending)
        .addCase(logoutAdminAccount.fulfilled, (state, action) => {
            const { message } = action.payload;
            state.admin = null;
            state.isAuthenticated = false;
            state.accessToken = null;
            state.loading = false;
            toast.success(message);
        })
        .addCase(logoutAdminAccount.rejected, handleRejected)
  },
})

export const { adminSetCredentials, setAccessToken } = adminAuthSlice.actions
export default adminAuthSlice.reducer