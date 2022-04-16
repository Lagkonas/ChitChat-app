import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
    signUp: (state, action) => {
      state.user = action.payload;
    },
    signIn: (state, action) => {
      state.user = action.payload;
    },

    extraReducers: {},
  },
});
export const { logOut, signUp, signIn } = userSlice.actions;
export default userSlice.reducer;
