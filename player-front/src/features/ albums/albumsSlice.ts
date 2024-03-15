import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createAlbum, deleteAlbum, getAlbumsList, updateAlbumPublished} from "./albumsThunk.ts";
import {AlbumsApi, GlobalError} from "../../types";

interface AlbumsState {
    albumsList: AlbumsApi[];
    fetchLoading: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    albumsFetchError: GlobalError | null;
    albumsUpdateError: GlobalError | null;
    albumsCreateError: GlobalError | null;
    albumsDeleteError: GlobalError | null;
    albumsIsPublishedMessage: string | null;
    albumsCreateMessage: string | null;
    albumsDeleteMessage: string | null;
}

const initialState: AlbumsState = {
    albumsList: [] ,
    fetchLoading: false,
    creating: false,
    updating:  false,
    deleting: false,
    albumsFetchError: null,
    albumsUpdateError: null,
    albumsCreateError: null,
    albumsDeleteError: null,
    albumsIsPublishedMessage: null,
    albumsCreateMessage:  null,
    albumsDeleteMessage:  null,
}
const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAlbumsList.pending, (state) => {
                state.fetchLoading = true;
                state.albumsFetchError = null;
            })
            .addCase(getAlbumsList.fulfilled, (state, {payload: albums}) => {
                state.fetchLoading = false;
                state.albumsList = albums;
            })
            .addCase(getAlbumsList.rejected, (state, {payload: data}) => {
                state.fetchLoading = false;
                state.albumsFetchError = data || null;
            })
            .addCase(updateAlbumPublished.pending, (state) => {
                state.updating = true;
                state.albumsIsPublishedMessage = null;
            })
            .addCase(updateAlbumPublished.fulfilled, (state,{payload: success}) => {
                state.updating = false;
                state.albumsIsPublishedMessage = success;
            })
            .addCase(updateAlbumPublished.rejected, (state, {payload: error}) => {
                state.updating = false;
                state.albumsUpdateError = error || null;
                state.albumsIsPublishedMessage = null;
            })
            .addCase(createAlbum.pending, (state) => {
              state.updating = true;
                state.albumsCreateMessage = null;
            })
            .addCase(createAlbum.fulfilled, (state, {payload: success}) => {
                state.updating = false;
                state.albumsCreateMessage = success;
            })
            .addCase(createAlbum.rejected, (state, {payload: error}) => {
                state.updating = false;
                state.albumsCreateError = error || null;
                state.albumsCreateMessage = null;
            })
            .addCase(deleteAlbum.pending, (state) => {
                state.deleting = true;
                state.albumsDeleteMessage = null;
            })
            .addCase(deleteAlbum.fulfilled, (state, {payload: success}) => {
                state.deleting = false;
                state.albumsDeleteMessage = success;
            })
            .addCase(deleteAlbum.rejected, (state, {payload: error}) => {
                state.deleting = false;
                state.albumsDeleteError = error || null;
                state.albumsDeleteMessage = null;
            })
    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;
export const selectAlbumsList = (state: RootState) => state.albums.albumsList
export const selectAlbumsFetchError = (state: RootState) => state.albums.albumsFetchError;
export const selectAlbumsCreating = (state: RootState) => state.albums.creating;
export const selectAlbumsDeleting = (state: RootState) => state.albums.deleting;
export const selectAlbumsIsPublishedUpdating = (state: RootState) => state.albums.updating;
export const selectAlbumIsPublishedError = (state: RootState) => state.albums.albumsUpdateError;
export const selectAlbumCreateError = (state: RootState) => state.albums.albumsCreateError;
export const selectAlbumCreateSuccess = (state: RootState) => state.albums.albumsCreateMessage;
export const selectAlbumIsPublishedSuccess = (state: RootState) => state.albums.albumsIsPublishedMessage;
export const selectAlbumDeleteSuccess = (state: RootState) => state.albums.albumsDeleteMessage;
export const selectAlbumDeleteError = (state: RootState) => state.albums.albumsDeleteError;
