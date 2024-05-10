import SLICES from '@/utilities/constants/slice.constants';
import { AppState } from '@/utilities/interfaces';
import { findAllChatBySenderId } from '@/utilities/services';
import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';

const initialState: AppState = {
  users: [],
  chats: [],
  isLoading: false,
  message: '',
  firebaseToken: '',
};
export const revertApp = createAction(`${SLICES.APP}/REVERT_ALL`);

export const findChat = createAsyncThunk(
  // Tên action
  `${SLICES.APP}/findChat`,

  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (payload: FindChat, { rejectWithValue }) => {
    // Gọi lên API backend
    const response = await findAllChatBySenderId(payload);

    // Nếu bị lỗi thì reject
    if (response.statusCode === HttpStatusCode.Ok) {
      return response.data;
    }

    // Còn không thì trả về dữ liệu
    return rejectWithValue(response.message);
  }
);

export const appSlice = createSlice({
  name: SLICES.APP,
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setFirebaseToken: (state, action: PayloadAction<string>) => {
      state.firebaseToken = action.payload;
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(findChat.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(
      findChat.fulfilled,
      (state, action: PayloadAction<Chat[]>) => {
        // Tắt trạng thái loading, lưu thông tin user vào store
        state.isLoading = false;
        state.chats = action.payload;
      }
    );

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(findChat.rejected, (state, action: any) => {
      // Tắt trạng thái loading
      state.isLoading = false;
      state.message = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, setChats, setFirebaseToken } = appSlice.actions;

export default appSlice.reducer;
