import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import memoReducer from './slices/memoSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
  },
});
