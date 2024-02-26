import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { TrackApi} from "../../types";

export const getTracksList = createAsyncThunk<TrackApi[], string | null>(
    'tracks',
    async (albumId) => {
       let response;
        response = await axiosApi.get<TrackApi[]>('/tracks');
        if(albumId){
           response = await axiosApi.get<TrackApi[]>(`/tracks?album=${albumId}`);
       }
        return response.data;
    }
);

