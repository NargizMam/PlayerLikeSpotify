import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {GlobalError, TrackApi} from "../../types";
import {createTrack, deleteTrack, getTracksList, updateTrackPublished} from "./trackThunk.ts";

interface TracksState {
    tracksList: TrackApi[];
    fetchLoading: boolean;
    creating: boolean;
    deleting: boolean;
    deleteError: GlobalError | null;
    trackUpdateError: GlobalError | null;
    tracksToggleFetching: boolean;
    tracksFetchingError: GlobalError | null;
}

const initialState: TracksState = {
    tracksList: [],
    fetchLoading: false,
    creating: false,
    deleting: false,
    deleteError: null,
    tracksToggleFetching: false,
    trackUpdateError: null,
    tracksFetchingError: null
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
            .addCase(getTracksList.rejected, (state, {payload: error}) => {
                state.fetchLoading = false;
                state.tracksFetchingError = error || null;
            })
            .addCase(createTrack.pending, (state) => {
            state.creating = true;
            })
            .addCase(createTrack.fulfilled, (state) => {
                state.creating = false;
            })
            .addCase(createTrack.rejected, (state) => {
                state.creating = false;
            })
            .addCase(updateTrackPublished.pending, (state) => {
                state.tracksToggleFetching = true;
            })
            .addCase(updateTrackPublished.fulfilled, (state) => {
                state.tracksToggleFetching = false;
            })
            .addCase(updateTrackPublished.rejected, (state, {payload: error}) => {
                state.tracksToggleFetching = false;
                state.trackUpdateError = error || null;
            })
            .addCase(deleteTrack.pending, (state) => {
                state.deleting = true;
            })
            .addCase(deleteTrack.fulfilled, (state) => {
                state.deleting = false;
            })
            .addCase(deleteTrack.rejected, (state, {payload: error}) => {
                state.deleting = false;
                state.deleteError = error || null;
            })



    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracksList = (state: RootState) => state.tracks.tracksList
export const selectTracksFetching = (state: RootState) => state.tracks.fetchLoading;
export const selectTracksCreating = (state: RootState) => state.tracks.creating;
export const selectTracksDeleting = (state: RootState) => state.tracks.deleting;
export const selectTracksDeleteError = (state: RootState) => state.tracks.deleteError;
export const selectTracksToggleFetching = (state: RootState) => state.tracks.tracksToggleFetching;
export const selectTrackUpdateError = (state: RootState) => state.tracks.trackUpdateError;
export const selectTracksFetchingError = (state: RootState) => state.tracks.tracksFetchingError;