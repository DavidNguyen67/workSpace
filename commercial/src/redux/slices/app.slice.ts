import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}
interface AppState {
  theme: THEME;
}

const initialState: AppState = {
  theme: THEME.LIGHT,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    },

    // incrementByAmount(state, action: PayloadAction<number>) =>{
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = appSlice.actions;

export default appSlice.reducer;
