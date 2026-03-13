import categoryReducer from './categorySlice';
import sizeGroupReducer from './sizeGroupSlice';
import subCategoryReducer from './subCategory';
import brandReducer from './brand';

const { combineReducers } = require("@reduxjs/toolkit");


const configurationRootReducer = combineReducers({
    category: categoryReducer,
    sizeGroup: sizeGroupReducer,
    subCategory: subCategoryReducer,
    brand: brandReducer,
})

export default configurationRootReducer;