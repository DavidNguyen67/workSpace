import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import socketSlice from '../slices/socket.slice';

const store = configureStore({
  reducer: {
    socket: socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
