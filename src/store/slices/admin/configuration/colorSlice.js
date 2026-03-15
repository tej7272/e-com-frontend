import { toast } from "react-toastify";
import { apiEndPoints } from "utils/api-endpoints";
import { handlePending, handleRejected } from "utils/sliceHelper";
import { getFormConfig } from "../formConfigSlice";
import adminAxios from "utils/adminAxios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



const initialState = {
    data: [],
    loading: false,
    error: null
}

export const getColors = createAsyncThunk(
    'get-colors',
    async (_, {rejectWithValue}) => {
        try {
            const res = await adminAxios.get(apiEndPoints.admin.configuration.getColors);
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to fetch colors",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const addNewColor = createAsyncThunk(
    'add-color',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const res = await adminAxios.post(apiEndPoints.admin.configuration.addColor, payload);
            dispatch(getFormConfig())
            dispatch(getColors());
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to add new color",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const updateColor = createAsyncThunk(
    'update-color',
    async ({ id, payload }, { dispatch, rejectWithValue }) => {
        try {
            const res = await adminAxios.patch(`${apiEndPoints.admin.configuration.updateColor}/${id}`, payload);
            dispatch(getFormConfig())
            dispatch(getColors());
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to update the color",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const deleteColor = createAsyncThunk(
    'delete-color',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const res = await adminAxios.delete(`${apiEndPoints.admin.configuration.deleteColor}/${id}`);
            dispatch(getFormConfig())
            dispatch(getColors());
            return res.data;
        } catch(err) {
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Failed to delete the color",
                errors: data?.errors || null,
            });
        }
    }
)


const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getColors.pending, handlePending)
        .addCase(getColors.rejected, handleRejected)
        .addCase(getColors.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
        })


        .addCase(addNewColor.pending, handlePending)
        .addCase(addNewColor.rejected, handleRejected)
        .addCase(addNewColor.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload.message || "Color added successfully!")
        })

        
        .addCase(updateColor.pending, handlePending)
        .addCase(updateColor.rejected, handleRejected)
        .addCase(updateColor.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message || "Color updated successfully!")
        })


        .addCase(deleteColor.pending, handlePending)
        .addCase(deleteColor.rejected, handleRejected)
        .addCase(deleteColor.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message || "Color deleted successfully!")
        })
    }
})

export default colorSlice.reducer;