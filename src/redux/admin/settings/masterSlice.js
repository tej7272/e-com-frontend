import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoints } from '../../../utils/api-endpoints';
import { toast } from 'react-toastify';


const initialState = {
    data: null,
    loading: false,
    error: ""
}

export const fetchMaster = createAsyncThunk(
    "master/fetchMaster", async (thunkAPI) => {
        try{
            const res = await axios.get(apiEndPoints.master.master);
            return res.data;
        }catch(err){
            thunkAPI.rejectWithValue(err.message || "Failed to fetch master data")
        }
    } 
)

const createMasterOperations = (name, endpoint) => {
    return createAsyncThunk(
        `master/add-${name}`, async (payload, {dispatch, rejectWithValue}) => {
            try{
                const res = await axios.post(endpoint, payload);
                await dispatch(fetchMaster());
                toast.success(res.data.message)
                return res.data;
            }catch(err){
                toast.error(err.response?.data?.message);
                rejectWithValue(err.response?.data?.message || `Failed to create ${name}`)
            }
        } 
    )
}

const updateMasterOperations = (name, endpoint) => {
    return createAsyncThunk(
        `master/update-${name}`, async (payload, {dispatch, rejectWithValue}) => {
            try{
                const res = await axios.patch(`${endpoint}/${payload.id}`, payload);
                await dispatch(fetchMaster());
                toast.success(res.data.message)
                return res.data;
            }catch(err){
                toast.error(err.response?.data?.message);
                rejectWithValue(err.message || `Failed to update`)
            }
        } 
    )
}

const deleteMasterOperations = (name, endpoint) => {
    return createAsyncThunk(
        `master/delete-${name}`, async (id, {dispatch, rejectWithValue}) => {
            try{
                const res = await axios.delete(`${endpoint}/${id}`);
                await dispatch(fetchMaster());
                toast.success(res.data.message);
                return res.data;
            }catch(err){
                toast.error(err.response.data.message);
                rejectWithValue(err.message || "Failed to add new brand")
            }
        } 
    )
}

// api call to do add opertations 
export const addNewBrand = createMasterOperations("brand", apiEndPoints.master.addBrand)
export const addNewGender = createMasterOperations("gender", apiEndPoints.master.addGender)
export const addNewCategory = createMasterOperations("category", apiEndPoints.master.addCategory)
export const addNewColor = createMasterOperations("color", apiEndPoints.master.addColor)
export const addNewSize = createMasterOperations("size", apiEndPoints.master.addSize)
export const addNewOrderStatus = createMasterOperations("order-status", apiEndPoints.master.addOrderStatus)


// api call to do update opertations
export const updateBrand = updateMasterOperations("brand", apiEndPoints.master.updateBrand)
export const updateGender = updateMasterOperations("gender", apiEndPoints.master.updateGender)
export const updateCategory = updateMasterOperations("category", apiEndPoints.master.updateCategory)
export const updateColor = updateMasterOperations("color", apiEndPoints.master.updateColor)
export const updateSize = updateMasterOperations("size", apiEndPoints.master.updateSize)
export const updateOrderStatus = updateMasterOperations("order-status", apiEndPoints.master.updateOrderStatus)


// api call to do delete opertations
export const deleteBrand = deleteMasterOperations("brand", apiEndPoints.master.deleteBrand)
export const deleteGender = deleteMasterOperations("gender", apiEndPoints.master.deleteGender)
export const deleteCategory = deleteMasterOperations("category", apiEndPoints.master.deleteCategory)
export const deleteColor = deleteMasterOperations("color", apiEndPoints.master.deleteColor)
export const deleteSize = deleteMasterOperations("size", apiEndPoints.master.deleteSize)
export const deleteOrderStatus = deleteMasterOperations("order-status", apiEndPoints.master.deleteOrderStatus)

const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMaster.pending, (state) => {
            state.loading = true;
            state.data = null
        })
        .addCase(fetchMaster.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchMaster.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }

});

export default masterSlice.reducer;