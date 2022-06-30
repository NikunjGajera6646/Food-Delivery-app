import { configureStore } from '@reduxjs/toolkit'
import userDataSlice from './Slice/userDataSlice'
import counterReducer from '../redux/Slice/counterSlice'

export default configureStore({
  reducer: {
    userDataSlice: userDataSlice,
    counter: counterReducer,
  },
})