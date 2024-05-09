import SLICES from '@/utilities/constants/slice.constants';
import { UserState } from '@/utilities/interfaces';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  info: null,
  token: '',
  chat: null,
  currentChat: null,
};

export const revertUser = createAction(`${SLICES.USER}/REVERT_ALL`);

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
    setCurrentChat: (state, action: PayloadAction<Chat | null>) => {
      state.currentChat = action.payload;
    },
  },
  // Sử lý logout
  extraReducers: (builder) => builder.addCase(revertUser, () => initialState),
});

// Action creators are generated for each case reducer function
export const { setToken, setInfo, setChat, setCurrentChat } = userSlice.actions;

export default userSlice.reducer;
