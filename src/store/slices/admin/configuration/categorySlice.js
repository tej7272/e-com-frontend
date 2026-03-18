import { toast } from "react-toastify";
import { adminAxios, apiEndPoints } from "utils/adminAxios";
import { handlePending, handleRejected } from "utils/sliceHelper";
import { getFormConfig } from "../formConfigSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



const initialState = {
    data: [],
    loading: false,
    error: null
}

export const getCategories = createAsyncThunk(
    'category',
    async (_, thunkAPI) => {
        try {
            const res = await adminAxios.get(apiEndPoints.admin.configuration.category);
            return res.data;
        } catch(err) {
            return thunkAPI.rejectWithValue({
                message: err.response?.data?.message || "Failed to fetch categories",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const addNewCategory = createAsyncThunk(
    'add-category',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const res = await adminAxios.post(apiEndPoints.admin.configuration.category, payload);
            dispatch(getFormConfig())
            dispatch(getCategories());
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to add new category",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const updateCategory = createAsyncThunk(
    'update-category',
    async ({ id, payload }, { dispatch, rejectWithValue }) => {
        try {
            const res = await adminAxios.patch(`${apiEndPoints.admin.configuration.category}/${id}`, payload);
            dispatch(getFormConfig())
            dispatch(getCategories());
            return res.data;
        } catch(err) {
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to update the category",
                errors: err.response?.data?.errors || null
            });
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'delete-category',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const res = await adminAxios.delete(`${apiEndPoints.admin.configuration.category}/${id}`);
            dispatch(getFormConfig())
            dispatch(getCategories());
            return res.data;
        } catch(err) {
            const data = err.response?.data
            return rejectWithValue({
                message: data?.message || "Failed to delete the category",
                errors: data?.errors || null,
            });
        }
    }
)


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCategories.pending, handlePending)
        .addCase(getCategories.rejected, handleRejected)
        .addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
        })


        .addCase(addNewCategory.pending, handlePending)
        .addCase(addNewCategory.rejected, handleRejected)
        .addCase(addNewCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload.message || "Category added successfully!")
        })

        
        .addCase(updateCategory.pending, handlePending)
        .addCase(updateCategory.rejected, handleRejected)
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message || "Category updated successfully!")
        })


        .addCase(deleteCategory.pending, handlePending)
        .addCase(deleteCategory.rejected, handleRejected)
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload?.message || "Category deleted successfully!")
        })

    }
})

export default categorySlice.reducer;