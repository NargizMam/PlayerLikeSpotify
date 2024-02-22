import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { TrackApi} from "../../types";

export const getTracksList = createAsyncThunk<TrackApi[], string>(
    'tracks',
    async (albumId) => {
        const response = await axiosApi.get<TrackApi[]>(`/tracks?album=${albumId}`);
        return response.data;
    }
);

