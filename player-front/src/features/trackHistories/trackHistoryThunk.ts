import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { TrackHistoryApi } from '../../types';


export const addTrackInHistory = createAsyncThunk<TrackHistoryApi, string>(
  'tracksHistory/add',
  async (trackId) => {
    const response = await axiosApi.post<TrackHistoryApi>('/trackHistory', trackId);
    return response.data;
  }
);
export const getTrackHistory = createAsyncThunk<TrackHistoryApi[]>(
  'tracksHistory/fetch',
  async () => {
    const response = await axiosApi.get<TrackHistoryApi[]>('/trackHistory');
    return response.data;
  }
);

