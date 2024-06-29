/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 16:58:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 17:48:42
 * @FilePath       : index.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './asyncSlice/pokemonApi.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './asyncSlice/userApi.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(pokemonApi.middleware)
        .concat(userApi.middleware),
  });
};

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(makeStore().dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
