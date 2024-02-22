import {createSlice} from "@reduxjs/toolkit";
import {getArtistsList} from "./artistsThunk.ts";
import {ArtistApi} from "../../types";
import {RootState} from "../../app/store.ts";

interface ArtistsState {
    artistsList: ArtistApi[];
    fetchLoading: boolean;
}

const initialState: ArtistsState = {
    artistsList: [],
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

    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtistsList = (state: RootState) => state.artists.artistsList;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
