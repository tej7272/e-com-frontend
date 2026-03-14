import categoryReducer from './categorySlice';
import sizeGroupReducer from './sizeGroupSlice';
import subCategoryReducer from './subCategory';
import brandReducer from './brandSlice';
import colorReducer from './colorSlice';

const { combineReducers } = require("@reduxjs/toolkit");


const configurationRootReducer = combineReducers({
    category: categoryReducer,
    sizeGroup: sizeGroupReducer,
    subCategory: subCategoryReducer,
    brand: brandReducer,
    color: colorReducer,
})

export default configurationRootReducer;