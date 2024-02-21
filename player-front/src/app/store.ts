import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from "../features/users/usersSlice.ts";
import {artistsReducer} from "../features/artists/artistsSlice.ts";
import {albumsReducer} from "../features/ albums/albumsSlice.ts";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    artists: artistsReducer,
    albums: albumsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;