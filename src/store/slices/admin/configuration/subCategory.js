import axios from "axios";
import { toast } from "react-toastify";
import { apiEndPoints } from "utils/api-endpoints";
import { handleRejected } from "utils/sliceHelper";
import { handlePending } from "utils/sliceHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const initialState = {
    data: [],
    loading: false,
    error: null
}

export const getSubCategories = createAsyncThunk(
    'get-subCategory',
    async (_, {rejectWithValue}) => {
        try{
            const res = await axios.get(apiEndPoints.configuration.getSubCategories);
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Failed to fetch sub-categories",
                errors: data?.errors || null
            })
        }
    }
)

export const addSubCategory = createAsyncThunk(
    'add-subCategory',
    async (payload, {dispatch, rejectWithValue}) => {
        try{
            const res = await axios.post(apiEndPoints.configuration.addSubCategory, payload);
            dispatch(getSubCategories());
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Failed to add new sub category",
                errors: data?.errors || null
            })
        }
    }
)

export const updateSubCategory = createAsyncThunk(
    'update-subCategory',
    async ({id, payload}, {dispatch, rejectWithValue}) => {
        try{
            const res = await axios.patch(`${apiEndPoints.configuration.addSubCategory}/${id}`, payload);
            dispatch(getSubCategories());
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Failed to update the sub category",
                errors: data?.errors || null
            })
        }
    }
)

export const deleteSubCategory = createAsyncThunk(
    'delete-subCategory',
    async (id, {dispatch, rejectWithValue}) => {
        try{
            const res = await axios.delete(`${apiEndPoints.configuration.addSubCategory}/${id}`);
            dispatch(getSubCategories());
            return res.data;
        }catch(err){
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Failed to delete the sub-category",
                errors: data?.errors || null
            })
        }
    }
)



const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getSubCategories.pending, handlePending)
        .addCase(getSubCategories.rejected, handleRejected)
        .addCase(getSubCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data
        })

        
        .addCase(addSubCategory.pending, handlePending)
        .addCase(addSubCategory.rejected, handleRejected)
        .addCase(addSubCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message);
        })

        
        .addCase(updateSubCategory.pending, handlePending)
        .addCase(updateSubCategory.rejected, handleRejected)
        .addCase(updateSubCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message);
        })

        
        .addCase(deleteSubCategory.pending, handlePending)
        .addCase(deleteSubCategory.rejected, handleRejected)
        .addCase(deleteSubCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message);
        })

    }
})

export default subCategorySlice.reducer;