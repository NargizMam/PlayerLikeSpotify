import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createAlbum, getAlbumsList, updateAlbumPublished} from "./albumsThunk.ts";
import {AlbumsApi, GlobalError} from "../../types";

interface AlbumsState {
    albumsList: AlbumsApi[];
    fetchLoading: boolean;
    creating: boolean;
    fetchError: GlobalError | null;
    albumsToggleFetching: boolean;
    albumsUpdateError: GlobalError | null;
}

const initialState: AlbumsState = {
    albumsList: [] ,
    fetchLoading: false,
    creating: false,
    fetchError: null,
    albumsToggleFetching: false,
    albumsUpdateError: null,
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
            .addCase(getAlbumsList.rejected, (state, {payload: data}) => {
                state.fetchLoading = false;
                state.fetchError = data || null;
            })
            .addCase(updateAlbumPublished.pending, (state) => {
                state.albumsToggleFetching = true;
            })
            .addCase(updateAlbumPublished.fulfilled, (state) => {
                state.albumsToggleFetching = false;
            })
            .addCase(updateAlbumPublished.rejected, (state, {payload: error}) => {
                state.albumsToggleFetching = false;
                state.albumsUpdateError = error || null;
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
export const selectAlbumsFetchError = (state: RootState) => state.albums.fetchError;
export const selectAlbumsToggleFetching = (state: RootState) => state.albums.albumsToggleFetching;
export const selectAlbumUpdateError = (state: RootState) => state.albums.albumsUpdateError;
