import axios from "axios";
import { toast } from "react-toastify";
import { apiEndPoints } from "utils/api-endpoints";
import { handlePending, handleRejected } from "utils/sliceHelper";
import { getFormConfig } from "../formConfigSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



const initialState = {
    data: [],
    loading: false,
    error: null
}

export const getBrands = createAsyncThunk(
    'brands',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get(apiEndPoints.configuration.getBrands);
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to fetch brands",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const addNewBrand = createAsyncThunk(
    'add-brand',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.post(apiEndPoints.configuration.addBrand, payload);
            dispatch(getFormConfig())
            dispatch(getBrands());
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to add new brand",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const updateBrand = createAsyncThunk(
    'update-brand',
    async ({ id, payload }, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.patch(`${apiEndPoints.configuration.updateBrand}/${id}`, payload);
            dispatch(getFormConfig())
            dispatch(getBrands());
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to update the brand",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const deleteBrand = createAsyncThunk(
    'delete-category',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.delete(`${apiEndPoints.configuration.deleteBrand}/${id}`);
            dispatch(getFormConfig())
            dispatch(getBrands());
            return res.data;
        } catch(err) {
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Failed to delete the brand",
                errors: data?.errors || null,
            });
        }
    }
)


const categorySlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBrands.pending, handlePending)
        .addCase(getBrands.rejected, handleRejected)
        .addCase(getBrands.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
        })


        .addCase(addNewBrand.pending, handlePending)
        .addCase(addNewBrand.rejected, handleRejected)
        .addCase(addNewBrand.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload.message || "Brand added successfully!")
        })

        
        .addCase(updateBrand.pending, handlePending)
        .addCase(updateBrand.rejected, handleRejected)
        .addCase(updateBrand.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message || "Brand updated successfully!")
        })


        .addCase(deleteBrand.pending, handlePending)
        .addCase(deleteBrand.rejected, handleRejected)
        .addCase(deleteBrand.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message || "Brand deleted successfully!")
        })

    }
})

export default categorySlice.reducer;