import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {TrackApi} from "../../types";
import {getTracksList} from "./trackThunk.ts";

interface TracksState {
    tracksList: TrackApi[]
    fetchLoading: boolean
}

const initialState: TracksState = {
    tracksList: [],
    fetchLoading: false
}
const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTracksList.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(getTracksList.fulfilled, (state, {payload: tracks}) => {
                state.fetchLoading = false;
                state.tracksList = tracks;
            })
            .addCase(getTracksList.rejected, (state) => {
                state.fetchLoading = false;
            })
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracksList = (state: RootState) => state.tracks.tracksList
export const selectTracksFetching = (state: RootState) => state.tracks.fetchLoading;
