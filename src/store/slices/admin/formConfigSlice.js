import adminAxios from "utils/adminAxios";
import { apiEndPoints } from "utils/api-endpoints";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    data:    null,
    status: 'idle',
    error:   null
}

export const getFormConfig = createAsyncThunk(
  'formConfig/get',
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminAxios.get(apiEndPoints.admin.getFormConfig)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
  
)

const formConfigSlice = createSlice({
    name: 'form-config',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFormConfig.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getFormConfig.rejected,  (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.message
        })
        .addCase(getFormConfig.fulfilled, (state, action) => {
            state.status = 'success';
            state.data    = action.payload.data;
        })
    }
});

export default formConfigSlice.reducer;