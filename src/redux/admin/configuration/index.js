import categoryReducer from './categorySlice';

const { combineReducers } = require("@reduxjs/toolkit");


const configurationRootReducer = combineReducers({
    category: categoryReducer
})

export default configurationRootReducer;