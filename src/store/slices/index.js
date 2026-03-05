import { combineReducers } from '@reduxjs/toolkit';
import formConfigRootReducer from './admin/formConfigSlice'
import configurationRootReducer from './admin/configuration';


const rootReducer = combineReducers({
    formConfig: formConfigRootReducer,
    configuration: configurationRootReducer,
  
})

export default rootReducer;