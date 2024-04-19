import { SocketState } from '@/utilities/interfaces/socket.interface';
import { IUser } from '@/utilities/interfaces/user.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ManagerOptions, SocketOptions, io } from 'socket.io-client';

// Define a type for the slice state
interface UserState extends IUser, SocketState {}

// Define the initial state using that type
const initialState: UserState = {
  id: '',
  email: '',
  name: '',
  socket: null,
};

export const userSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: () => {},
    logout: () => {},
    connectToServer: (
      state,
      action: PayloadAction<{
        url: string;
        socketConfig: Partial<ManagerOptions & SocketOptions>;
      }>
    ) => {
      state.socket = io(action.payload.url);
    },
    disconnectToServer: (state) => {
      state.socket = null;
    },
  },
});

export const { connectToServer } = userSlice.actions;

export default userSlice.reducer;
