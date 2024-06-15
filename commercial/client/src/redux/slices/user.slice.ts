import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  accessToken: string;
  refreshToken: string;
  address: AddressForm | null;
  addressString: string;
}

const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
  address: null,
  addressString: '',
};

export const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    resetToken: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
    },
    setAddress: (
      state,
      action: PayloadAction<{ address: AddressForm; addressString: string }>
    ) => {
      state.address = action.payload.address;
      state.addressString = action.payload.addressString;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setAddress } = appSlice.actions;

export default appSlice.reducer;
