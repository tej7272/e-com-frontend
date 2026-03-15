import { combineReducers } from '@reduxjs/toolkit';
import formConfigRootReducer from './admin/formConfigSlice'
import configurationRootReducer from './admin/configuration';
import adminAuthRootReducer from './auth/adminAuthSlice';


const rootReducer = combineReducers({
    formConfig: formConfigRootReducer,
    configuration: configurationRootReducer,
    adminAuth: adminAuthRootReducer
  
})

export default rootReducer;