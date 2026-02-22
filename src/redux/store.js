import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '.'

export default configureStore({
  reducer: rootReducer,
})