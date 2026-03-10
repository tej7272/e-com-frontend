import axios from "axios";
import { toast } from "react-toastify";
import { apiEndPoints } from "utils/api-endpoints";
import { handleRejected } from "utils/sliceHelper";
import { handlePending } from "utils/sliceHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export const getSizeGroups = createAsyncThunk(
    'get-sizeGroups',
    async (_, {rejectWithValue}) => {
        try{
            const res = await axios.get(apiEndPoints.configuration.getSizeGroups)
            return res.data;
        }catch(err){
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to fetch the size groups",
                errors: err.response?.data?.errors || null
            })
        }
    }
)

export const addSizeGroup = createAsyncThunk(
    'add-sizeGroup',
    async (payload, {dispatch, rejectWithValue}) => {
        try{
            const res = await axios.post(apiEndPoints.configuration.addSizeGroup, payload);
            dispatch(getSizeGroups())
            return res.data;
        }catch(err){
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to add the size group",
                errors: err.response?.data?.errors || null
            })

        }
    }
)


export const updateSizeGroup = createAsyncThunk(
    'update-sizeGroup',
    async ({id, payload}, {dispatch, rejectWithValue}) => {
        try{
            const res = await axios.patch(`${apiEndPoints.configuration.updateSizeGroup}/${id}`, payload);
            dispatch(getSizeGroups())
            return res.data;
        }catch(err){
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to update the size group",
                errors: err.response?.data?.errors || null
            })

        }
    }
)


export const deleteSizeGroup = createAsyncThunk(
    'delete-sizeGroup',
    async (id, {dispatch, rejectWithValue}) => {
        try{
            const res = await axios.delete(`${apiEndPoints.configuration.addSizeGroup}/${id}`);
            dispatch(getSizeGroups())
            return res.data;
        }catch(err){
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to delete the size group",
                errors: err.response?.data?.errors || null
            })

        }
    }
)



const initialState = {
    data: [],
    loading: true,
    error: null
}


const sizeGroupSlice = createSlice({
    name: "size-group",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getSizeGroups.pending, handlePending)
        .addCase(getSizeGroups.rejected, handleRejected)
        .addCase(getSizeGroups.fulfilled, (state, action) =>  {
            state.loading = false;
            state.data = action.payload?.data;
        })


        .addCase(addSizeGroup.pending, handlePending)
        .addCase(addSizeGroup.rejected, handleRejected)
        .addCase(addSizeGroup.fulfilled, (state, action) =>  {
            state.loading = false;
            toast.success(action.payload?.message);
        })


        .addCase(updateSizeGroup.pending, handlePending)
        .addCase(updateSizeGroup.rejected, handleRejected)
        .addCase(updateSizeGroup.fulfilled, (state, action) =>  {
            state.loading = false;
            toast.success(action.payload?.message);
        })


        .addCase(deleteSizeGroup.pending, handlePending)
        .addCase(deleteSizeGroup.rejected, handleRejected)
        .addCase(deleteSizeGroup.fulfilled, (state, action) =>  {
            state.loading = false;
            toast.success(action.payload?.message);
        })
    }
})


export default sizeGroupSlice.reducer; 