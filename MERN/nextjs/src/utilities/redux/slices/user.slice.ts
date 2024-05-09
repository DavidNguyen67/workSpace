import SLICES from '@/utilities/constants/slice.constants';
import { UserState } from '@/utilities/interfaces';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  info: null,
  token: '',
  chat: null,
  currentChatId: '',
};

export const revertAll = createAction('REVERT_ALL');

export const userSlice = createSlice({
  name: SLICES.USER,
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setInfo: (state, action: PayloadAction<User>) => {
      state.info = action.payload;
    },
    setChat: (state, action: PayloadAction<Chat>) => {
      state.chat = action.payload;
    },
    setCurrentChatId: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
  },
  // Sử lý logout
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
});

// Action creators are generated for each case reducer function
export const { setToken, setInfo, setChat, setCurrentChatId } =
  userSlice.actions;

export default userSlice.reducer;
