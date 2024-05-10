import SLICES from '@/utilities/constants/slice.constants';
import { SocketState } from '@/utilities/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: SocketState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: SLICES.SOCKET,
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
