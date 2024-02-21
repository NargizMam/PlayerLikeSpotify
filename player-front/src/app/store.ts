import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from "../features/users/usersSlice.ts";
import {artistsReducer} from "../features/artists/artistsSlice.ts";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    artists: artistsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;