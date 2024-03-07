import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {TrackApi, TrackMutation} from "../../types";

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
export const createTrack= createAsyncThunk<void, TrackMutation>(
    'tracksHistory/add',
    async (trackMutation) => {
        try{
            await axiosApi.post('/tracks',trackMutation);
        }catch (e) {
            throw e;
        }
    }
);

