import categoryReducer from './categorySlice';
import sizeGroupReducer from './sizeGroupSlice';
import subCategoryReducer from './subCategory';

const { combineReducers } = require("@reduxjs/toolkit");


const configurationRootReducer = combineReducers({
    category: categoryReducer,
    sizeGroup: sizeGroupReducer,
    subCategory: subCategoryReducer,
})

export default configurationRootReducer;