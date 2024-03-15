import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { GlobalError, TrackApi } from '../../types';
import { createTrack, deleteTrack, getTracksList, updateTrackPublished } from './trackThunk.ts';

interface TracksState {
  tracksList: TrackApi[];
  fetchLoading: boolean;
  creating: boolean;
  isPublishedUpdating: boolean;
  deleting: boolean;
  tracksFetchingError: GlobalError | null;
  createError: GlobalError | null;
  createSuccess: string | null;
  isPublishedSuccess: string | null,
  deleteSuccess: string | null,
  trackIsPublishedError: GlobalError | null;
  deleteError: GlobalError | null;
}

const initialState: TracksState = {
  tracksList: [],
  fetchLoading: false,
  creating: false,
  isPublishedUpdating: false,
  deleting: false,
  createSuccess: null,
  isPublishedSuccess: null,
  deleteSuccess: null,
  tracksFetchingError: null,
  createError: null,
  trackIsPublishedError: null,
  deleteError: null
};
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
        state.createError = null;
        state.createSuccess = null;
      })
      .addCase(createTrack.fulfilled, (state, {payload: success}) => {
        state.creating = false;
        state.createSuccess = success;
      })
      .addCase(createTrack.rejected, (state, {payload: error}) => {
        state.creating = false;
        state.createError = error || null;
      })
      .addCase(updateTrackPublished.pending, (state) => {
        state.isPublishedUpdating = true;
        state.trackIsPublishedError = null;
        state.isPublishedSuccess = null;
      })
      .addCase(updateTrackPublished.fulfilled, (state, {payload: success}) => {
        state.isPublishedUpdating = false;
        state.isPublishedSuccess = success;
      })
      .addCase(updateTrackPublished.rejected, (state, {payload: error}) => {
        state.isPublishedUpdating = false;
        state.trackIsPublishedError = error || null;
      })
      .addCase(deleteTrack.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
        state.deleteSuccess = null;
      })
      .addCase(deleteTrack.fulfilled, (state, {payload: success}) => {
        state.deleting = false;
        state.deleteSuccess = success;
      })
      .addCase(deleteTrack.rejected, (state, {payload: error}) => {
        state.deleting = false;
        state.deleteError = error || null;
      });


  }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracksFetching = (state: RootState) => state.tracks.fetchLoading;
export const selectTracksList = (state: RootState) => state.tracks.tracksList;
export const selectTracksFetchingError = (state: RootState) => state.tracks.tracksFetchingError;
export const selectTracksCreating = (state: RootState) => state.tracks.creating;
export const selectTrackCreateError = (state: RootState) => state.tracks.createError;
export const selectTrackCreateSuccess = (state: RootState) => state.tracks.createSuccess;
export const selectTracksIsPublishedUpdating = (state: RootState) => state.tracks.isPublishedUpdating;
export const selectTrackIsPublishedError = (state: RootState) => state.tracks?.trackIsPublishedError;
export const selectTrackIsPublishedSuccess = (state: RootState) => state.tracks.isPublishedSuccess;
export const selectTracksDeleting = (state: RootState) => state.tracks.deleting;
export const selectTracksDeleteSuccess = (state: RootState) => state.tracks.deleteSuccess;
export const selectTracksDeleteError = (state: RootState) => state.tracks.deleteError;
