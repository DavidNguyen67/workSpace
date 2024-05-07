import SLICES from '@/utilities/constants/slice.constants';
import { SocketState } from '@/utilities/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: SocketState = {
  socket: null,
  firebaseToken: '',
};

export const socketSlice = createSlice({
  name: SLICES.SOCKET,
  initialState,
  reducers: {
    setFirebaseToken: (state, action: PayloadAction<string>) => {
      state.firebaseToken = action.payload;
    },
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSocket, setFirebaseToken } = socketSlice.actions;

export default socketSlice.reducer;
