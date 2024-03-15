import {createSlice} from "@reduxjs/toolkit";
import {createArtist, deleteArtist, getArtistsList, updateArtistPublished} from "./artistsThunk.ts";
import {ArtistApi, GlobalError} from "../../types";
import {RootState} from "../../app/store.ts";

interface ArtistsState {
    artistsList: ArtistApi[];
    fetchLoading: boolean;
    creating: boolean;
    artistsIsPublishedFetching: boolean;
    artistCreateMessage: string | null;
    artistIsPublishedMessage: string | null;
    artistDeleteMessage: string | null;
    artistsIsPublishedError: GlobalError | null;
    artistsCreateError: GlobalError | null;
    artistsDeleteError: GlobalError | null;
}

const initialState: ArtistsState = {
    artistsList: [],
    fetchLoading: false,
    creating: false,
    artistsIsPublishedFetching: false,
    artistCreateMessage: null,
    artistIsPublishedMessage: null,
    artistDeleteMessage: null,
    artistsIsPublishedError: null,
    artistsCreateError: null,
    artistsDeleteError: null,
}
const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArtistsList.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(getArtistsList.fulfilled, (state, {payload: artists}) => {
                state.fetchLoading = false;
                state.artistsList = artists;
            })
            .addCase(getArtistsList.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(updateArtistPublished.pending, (state) => {
                state.artistsIsPublishedFetching = true;
                state.artistsIsPublishedError = null;
                state.artistIsPublishedMessage = null;
            })
            .addCase(updateArtistPublished.fulfilled, (state, {payload: success}) => {
                state.artistsIsPublishedFetching = false;
                state.artistIsPublishedMessage = success;
            })
            .addCase(updateArtistPublished.rejected, (state, {payload: error}) => {
                state.artistsIsPublishedFetching = false;
                state.artistsIsPublishedError = error || null;
            })
            .addCase(createArtist.pending, (state) => {
                state.creating = true;
                state.artistCreateMessage = null;
                state.artistsCreateError = null;

            })
            .addCase(createArtist.fulfilled, (state, {payload: success}) => {
                state.creating = false;
                state.artistCreateMessage = success;
            })
            .addCase(createArtist.rejected, (state, {payload: error}) => {
                state.creating = false;
                state.artistsCreateError = error || null;
                state.artistCreateMessage = null;
            })
            .addCase(deleteArtist.pending, (state) => {
                state.creating = true;
                state.artistDeleteMessage = null;
                state.artistsDeleteError = null;
            })
            .addCase(deleteArtist.fulfilled, (state, {payload: success}) => {
                state.creating = false;
                state.artistDeleteMessage = success;
            })
            .addCase(deleteArtist.rejected, (state, {payload: error}) => {
                state.creating = false;
                state.artistsDeleteError = error || null;
                state.artistDeleteMessage = null;
            })

    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtistsList = (state: RootState) => state.artists.artistsList;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
export const selectArtistsCreating = (state: RootState) => state.artists.creating;
export const selectArtistsIsPublishedFetching = (state: RootState) => state.artists.artistsIsPublishedFetching;
export const selectArtistIsPublishedError = (state: RootState) => state.artists.artistsIsPublishedError;
export const selectArtistCreateError = (state: RootState) => state.artists.artistsCreateError;
export const selectArtistDeleteError = (state: RootState) => state.artists.artistsDeleteError;
export const selectArtistCreateSuccess = (state: RootState) => state.artists.artistCreateMessage;
export const selectArtistIsPublishedSuccess = (state: RootState) => state.artists.artistIsPublishedMessage;
export const selectArtistDeleteSuccess = (state: RootState) => state.artists.artistDeleteMessage;