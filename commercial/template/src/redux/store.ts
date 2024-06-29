/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 16:58:03
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 16:58:03
 * @FilePath       : store.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {},
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
