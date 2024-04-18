import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SOCKET_SLICE } from '../../utilities/constants/constant-slice';
import { SocketState } from '../../utilities/interfaces/socket.interface';
// Define the initial state using that type
const initialState: SocketState = {
  socket: null,
  isOnline: false,
};

export const socketSlice = createSlice({
  name: SOCKET_SLICE,
  initialState,
  reducers: {
    connectToServer: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
    disconnectToServer: (state) => {
      state.socket?.disconnect();
      state.socket = null;
    },
    handleSetOnline: (state, action: PayloadAction<OnlineUser[]>) => {
      if (action.payload?.length > 0) {
        state.isOnline = action.payload.includes(state.socket?.id);
      }
    },
  },
});

export const { handleSetOnline, connectToServer, disconnectToServer } =
  socketSlice.actions;

export default socketSlice.reducer;
