import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../slices/app.slice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import userSlice from '../slices/user.slice';
import filterProductSlice from '../slices/filteredProduct.slice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appSlice,
      user: userSlice,
      filterProductSlice,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
