import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    deleteUser: (state) => {
      state.id = '';
      state.name = '';
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
