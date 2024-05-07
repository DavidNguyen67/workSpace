import SLICES from '@/utilities/constants/slice.constants';
import { UserState } from '@/utilities/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  token: '',
};

export const userSlice = createSlice({
  name: SLICES.USER,
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = userSlice.actions;

export default userSlice.reducer;
