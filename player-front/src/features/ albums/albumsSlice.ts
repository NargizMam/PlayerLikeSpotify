import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createAlbum, getAlbumsList} from "./albumsThunk.ts";
import {AlbumsApi} from "../../types";

interface AlbumsState {
    albumsList: AlbumsApi[];
    fetchLoading: boolean;
    creating: boolean;
}

const initialState: AlbumsState = {
    albumsList: [],
    fetchLoading: false,
    creating: false
}
const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAlbumsList.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(getAlbumsList.fulfilled, (state, {payload: albums}) => {
                state.fetchLoading = false;
                state.albumsList = albums;
            })
            .addCase(getAlbumsList.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(createAlbum.pending, (state) => {
                state.creating = true;
            })
            .addCase(createAlbum.fulfilled, (state) => {
                state.creating = false;
            })
            .addCase(createAlbum.rejected, (state) => {
                state.creating = false;
            })
    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbumsList = (state: RootState) => state.albums.albumsList
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;
export const selectAlbumsCreating = (state: RootState) => state.albums.creating;
