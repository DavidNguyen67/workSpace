import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  accessToken: string;
  refreshToken: string;
}

const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
};

export const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    resetToken: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = appSlice.actions;

export default appSlice.reducer;
