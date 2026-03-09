import categoryReducer from './categorySlice';
import sizeGroupReducer from './sizeGroupSlice';

const { combineReducers } = require("@reduxjs/toolkit");


const configurationRootReducer = combineReducers({
    category: categoryReducer,
    sizeGroup: sizeGroupReducer
})

export default configurationRootReducer;