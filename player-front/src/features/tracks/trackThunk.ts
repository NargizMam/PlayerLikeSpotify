import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {GlobalError, TrackApi, TrackMutation} from "../../types";
import {isAxiosError} from "axios";

export const getTracksList = createAsyncThunk<TrackApi[], string | undefined>(
    'tracks',
    async (albumId) => {
       let response;
        if(albumId){
            response = await axiosApi.get<TrackApi[]>(`/tracks?album=${albumId}`);
        }else{
            response = await axiosApi.get<TrackApi[]>('/tracks');
        }
        return response.data;
    }
);
export const createTrack= createAsyncThunk<void, TrackMutation, { rejectValue: GlobalError}>(
    'tracks/add',
    async (trackMutation, {rejectWithValue}) => {
        try{
            await axiosApi.post('/tracks',trackMutation);
        }catch (e) {
            if(isAxiosError(e) && e.response ){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);
export const updateTrackPublished = createAsyncThunk<void, string, { rejectValue: GlobalError}>(
    '/tracks/toggle',
    async (id, {rejectWithValue}) => {
        try{
            const response = await axiosApi.patch(`/tracks/${id}/togglePublished`);
            return response.data;
        }catch (e) {
            if(isAxiosError(e) && e.response ){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);
export const deleteTrack = createAsyncThunk<void, string, { rejectValue: GlobalError}>(
    'tracks/delete',
    async (id, {rejectWithValue}) => {
        try{
            await axiosApi.delete(`/tracks/${id}`);
        }catch (e) {
            if(isAxiosError(e) && e.response ){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

