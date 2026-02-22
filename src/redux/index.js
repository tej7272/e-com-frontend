import { combineReducers } from '@reduxjs/toolkit';
import masterReducer from './admin/settings/masterSlice'


const rootReducer = combineReducers({
    master: masterReducer,
  
})

export default rootReducer;