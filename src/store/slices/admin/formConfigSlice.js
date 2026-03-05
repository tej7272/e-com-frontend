import axios from "axios";
import { apiEndPoints } from "utils/api-endpoints";
import { handlePending, handleRejected } from "utils/sliceHelper"; // ✅ fixed name

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    data:    null,
    loading: false,
    error:   null  // ✅ null not ""
}

export const getFormConfig = createAsyncThunk(
    'form-config',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(apiEndPoints.getFormConfig);
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to fetch master data",
                errors:  err.response?.data?.errors  || null  // ✅ optional chaining
            });
        }
    }
)

const formConfigSlice = createSlice({
    name: 'form-config',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFormConfig.pending,   handlePending)
        .addCase(getFormConfig.rejected,  handleRejected)  // ✅ fixed name
        .addCase(getFormConfig.fulfilled, (state, action) => {
            state.loading = false;
            state.data    = action.payload.data;
        })
    }
});

export default formConfigSlice.reducer;