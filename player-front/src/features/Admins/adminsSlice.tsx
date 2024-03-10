import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {AdminsAlbumsApi, GlobalError} from "../../types";
import {
    getAdminsAlbumsList,
    updateAlbumPublished,
    updateArtistPublished,
    updateTrackPublished
} from "./adminsThunk.tsx";

interface AdminsState {
    albumsList: AdminsAlbumsApi[][];
    fetchLoading: boolean;
    fetchError: GlobalError | null;
    albumsToggleFetching: boolean;
    artistsToggleFetching: boolean;
    tracksToggleFetching: boolean;
}

const initialState: AdminsState = {
    albumsList: [] ,
    fetchLoading: false,
    fetchError: null,
    albumsToggleFetching: false,
    artistsToggleFetching: false,
    tracksToggleFetching: false,
}
const adminsSlice = createSlice({
    name: 'admins/albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminsAlbumsList.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(getAdminsAlbumsList.fulfilled, (state, {payload: albums}) => {
            state.fetchLoading = false;
            state.albumsList = albums;
            })
            .addCase(getAdminsAlbumsList.rejected, (state, {payload: data}) => {
                state.fetchLoading = false;
                state.fetchError = data || null;
            })
            .addCase(updateAlbumPublished.pending, (state) => {
                state.albumsToggleFetching = true;
            })
            .addCase(updateAlbumPublished.fulfilled, (state) => {
                state.albumsToggleFetching = false;
            })
            .addCase(updateAlbumPublished.rejected, (state) => {
                state.albumsToggleFetching = false;
            })
            .addCase(updateArtistPublished.pending, (state) => {
                state.artistsToggleFetching = true;
            })
            .addCase(updateArtistPublished.fulfilled, (state) => {
                state.artistsToggleFetching = false;
            })
            .addCase(updateArtistPublished.rejected, (state) => {
                state.artistsToggleFetching = false;
            })
            .addCase(updateTrackPublished.pending, (state) => {
                state.tracksToggleFetching = true;
            })
            .addCase(updateTrackPublished.fulfilled, (state) => {
                state.tracksToggleFetching = false;
            })
            .addCase(updateTrackPublished.rejected, (state) => {
                state.tracksToggleFetching = false;
            })

    }
});

export const adminsReducer = adminsSlice.reducer;

export const selectList = (state: RootState) => state.admins.albumsList
export const selectListFetching = (state: RootState) => state.admins.fetchLoading;
export const selectAlbumsToggleFetching = (state: RootState) => state.admins.albumsToggleFetching;
export const selectArtistsToggleFetching = (state: RootState) => state.admins.artistsToggleFetching;
export const selectTracksToggleFetching = (state: RootState) => state.admins.tracksToggleFetching;

