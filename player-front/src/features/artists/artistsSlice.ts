import {createSlice} from "@reduxjs/toolkit";
import {createArtist, getArtistsList, updateArtistPublished} from "./artistsThunk.ts";
import {ArtistApi, GlobalError} from "../../types";
import {RootState} from "../../app/store.ts";

interface ArtistsState {
    artistsList: ArtistApi[];
    fetchLoading: boolean;
    creating: boolean;
    artistsToggleFetching: boolean;
    artistsUpdateError: GlobalError | null;
}

const initialState: ArtistsState = {
    artistsList: [],
    fetchLoading: false,
    creating: false,
    artistsToggleFetching: false,
    artistsUpdateError: null,
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
                state.artistsToggleFetching = true;
            })
            .addCase(updateArtistPublished.fulfilled, (state) => {
                state.artistsToggleFetching = false;
            })
            .addCase(updateArtistPublished.rejected, (state, {payload: error}) => {
                state.artistsToggleFetching = false;
                state.artistsUpdateError = error || null;
            })
            .addCase(createArtist.pending, (state) => {
                state.creating = true;
            })
            .addCase(createArtist.fulfilled, (state) => {
                state.creating = false;
            })
            .addCase(createArtist.rejected, (state) => {
                state.creating = false;
            })

    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtistsList = (state: RootState) => state.artists.artistsList;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
export const selectArtistsCreating = (state: RootState) => state.artists.creating;
export const selectArtistsToggleFetching = (state: RootState) => state.artists.artistsToggleFetching;
export const selectArtistUpdateError = (state: RootState) => state.artists.artistsUpdateError;