/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-11 21:56:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-11 22:03:29
 * @FilePath       : user.slice.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE } from '../../utility/enum/slice.enum';

// Define a type for the slice state
export interface UserState {
  access_token?: string;
  refreshToken?: string;
}

// Define the initial state using that type
const initialState: UserState = {
  refreshToken: '',
  access_token: '',
};

export const counterSlice = createSlice({
  name: JSON.stringify(SLICE.USER),
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<KeycloakResponse>) => {
      state.refreshToken = action.payload.refresh_token;
      state.access_token = action.payload.access_token;
    },
  },
});

export const { setUserToken } = counterSlice.actions;

export default counterSlice.reducer;
