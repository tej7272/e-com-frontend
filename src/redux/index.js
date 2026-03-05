import { combineReducers } from '@reduxjs/toolkit';
import masterReducer from './admin/configuration/masterSlice'
import configurationRootReducer from './admin/configuration';


const rootReducer = combineReducers({
    configuration: configurationRootReducer,
    master: masterReducer,
  
})

export default rootReducer;