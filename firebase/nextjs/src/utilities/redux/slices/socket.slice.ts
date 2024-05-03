import SLICES from '@/utilities/constants/slice.constants';
import { SocketState } from '@/utilities/interfaces/index.interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SocketState = {
  io: new WebSocket('ws://localhost:8080'),
};

export const socketSlice = createSlice({
  name: SLICES.SOCKET,
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = socketSlice.actions;

export default socketSlice.reducer;
