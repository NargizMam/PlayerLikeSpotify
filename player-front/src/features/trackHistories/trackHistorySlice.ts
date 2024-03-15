import { TrackHistoryApi } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addTrackInHistory, getTrackHistory } from './trackHistoryThunk.ts';
import { RootState } from '../../app/store.ts';

interface TrackHistoryState {
  trackHistories: TrackHistoryApi[],
  historyFetching: boolean;

}

const initialState: TrackHistoryState = {
  trackHistories: [],
  historyFetching: false,
};

const trackHistorySlice = createSlice({
  name: 'trackHistories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTrackInHistory.pending, (state) => {
      state.historyFetching = true;
    });
    builder.addCase(addTrackInHistory.fulfilled, (state) => {
      state.historyFetching = false;
    });
    builder.addCase(addTrackInHistory.rejected, (state) => {
      state.historyFetching = false;
    });
    builder.addCase(getTrackHistory.pending, (state) => {
      state.historyFetching = true;
    });
    builder.addCase(getTrackHistory.fulfilled, (state, {payload: tracksHistory}) => {
      state.historyFetching = false;
      state.trackHistories = tracksHistory;
    });
    builder.addCase(getTrackHistory.rejected, (state) => {
      state.historyFetching = false;
    });
  }
});
export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectTrackHistories = (state: RootState) => state.trackHistory.trackHistories;
export const selectTrackHistoryFetching = (state: RootState) => state.trackHistory.historyFetching;