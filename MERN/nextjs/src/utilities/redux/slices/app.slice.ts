import SLICES from '@/utilities/constants/slice.constants';
import { AppState } from '@/utilities/interfaces';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

const initialState: AppState = {
  users: [],
};

export const appSlice = createSlice({
  name: SLICES.APP,
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers } = appSlice.actions;

export default appSlice.reducer;
