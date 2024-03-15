import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { AlbumMutation, AlbumsApi, GlobalError } from '../../types';
import { isAxiosError } from 'axios';

export const getAlbumsList = createAsyncThunk<AlbumsApi[], string | undefined, { rejectValue: GlobalError }>(
  'albums/fetch',
  async (artistName, {rejectWithValue}) => {
    let response;
    try {
      if (artistName) {
        response = await axiosApi.get<AlbumsApi[]>(`/albums?artist=${artistName}`);
      } else {
        response = await axiosApi.get<AlbumsApi[]>('/albums');
      }
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }

  }
);

export const createAlbum = createAsyncThunk<string, AlbumMutation, { rejectValue: GlobalError }>(
  'albums/create',
  async (albumMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
      keys.forEach(key => {
        const value = albumMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });
      const response = await axiosApi.post('/albums', formData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      return e;
    }

  }
);
export const updateAlbumPublished = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
  '/albums/toggle',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosApi.patch(`/albums/${id}/togglePublished`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
export const deleteAlbum = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
  'albums/delete',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosApi.delete(`/albums/${id}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);