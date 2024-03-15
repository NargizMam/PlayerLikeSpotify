import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { GlobalError, TrackApi, TrackMutation } from '../../types';
import { isAxiosError } from 'axios';

export const getTracksList = createAsyncThunk<TrackApi[], string | undefined, { rejectValue: GlobalError }>(
  'tracks/fetch',
  async (id, {rejectWithValue}) => {
    try {
      let response;
      if (id) {
        response = await axiosApi.get<TrackApi[]>(`/tracks?album=${id}`);
        return response.data;
      } else {
        response = await axiosApi.get<TrackApi[]>('/tracks');
        return response.data;
      }
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }

  }
);
export const createTrack = createAsyncThunk<string, TrackMutation, { rejectValue: GlobalError }>(
  'tracks/add',
  async (trackMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/tracks', trackMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
export const updateTrackPublished = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
  '/tracks/toggle',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosApi.patch(`/tracks/${id}/togglePublished`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
export const deleteTrack = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
  'tracks/delete',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosApi.delete(`/tracks/${id}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

