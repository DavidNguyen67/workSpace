import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { USER_SLICE } from '../../utilities/constants/constant-slice';
import { MessageState } from '../../utilities/interfaces/interface.slice';
import { jwtDecode } from 'jwt-decode';

// Define the initial state using that type
const initialState: MessageState = {
  userId: null,
  userToken: null,
  messages: [],
  isOnline: false,
};

export const userSlice = createSlice({
  name: USER_SLICE,
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.userToken = action.payload?.token;
      const data: any = jwtDecode(action.payload?.token);
      state.userId = data.id;
    },
    logout: (state) => {
      state = initialState;
    },
    sendMessage: (state, action: PayloadAction<Message>) => {},
    receiveMessage: (state, action: PayloadAction<Message>) => {},
  },
});

export const { sendMessage, receiveMessage, login, logout } = userSlice.actions;

export default userSlice.reducer;
