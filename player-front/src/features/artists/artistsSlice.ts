import {createSlice} from "@reduxjs/toolkit";
import {getArtistsList, getOneArtist} from "./artistsThunk.ts";
import {ArtistApi} from "../../types";
import {RootState} from "../../app/store.ts";

interface ArtistsState {
    artistsList: ArtistApi[];
    artistName: ArtistApi | null;
    fetchLoading: boolean;
}

const initialState: ArtistsState = {
    artistsList: [],
    artistName: null,
    fetchLoading: false
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
            .addCase(getOneArtist.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(getOneArtist.fulfilled, (state, {payload: artist}) => {
                state.fetchLoading = false;
                state.artistName = artist;
            })
            .addCase(getOneArtist.rejected, (state) => {
                state.fetchLoading = false;
            })
    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtistsList = (state: RootState) => state.artists.artistsList;
export const selectArtistsName = (state: RootState) => state.artists.artistName;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
