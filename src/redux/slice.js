import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    tokenApi: '',
    role: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.tokenApi = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = globalSlice.actions;

export default globalSlice.reducer;
