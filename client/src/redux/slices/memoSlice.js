import { createSlice } from '@reduxjs/toolkit';

export const memoSlice = createSlice({
  name: 'memo',
  initialState: { value: [] },
  reducers: {
    setMemo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMemo } = memoSlice.actions;

export default memoSlice.reducer;
