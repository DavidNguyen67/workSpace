import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../slices/app.slice';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../slices/user.slice';
import filterProductSlice from '../slices/filteredProduct.slice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    filterProductSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
