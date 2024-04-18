import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slice';
import socketReducer from '../slices/socket.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
