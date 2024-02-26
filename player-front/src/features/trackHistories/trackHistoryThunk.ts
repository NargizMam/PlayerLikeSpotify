import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {TrackHistoryApi} from "../../types";

interface TrackProps {
    trackId: string;
    token: string;
}
export const addTrackInHistory = createAsyncThunk<TrackHistoryApi, TrackProps>(
    'tracksHistory/add',
    async ({trackId, token}) => {
        const response = await axiosApi.post<TrackHistoryApi>('/trackHistory',
            {trackId}, { headers: { Authorization: `_bearer ${token}` }});
        return response.data;
    }
);
export const getTrackHistory = createAsyncThunk<TrackHistoryApi[], string>(
    'tracksHistory/fetch',
    async ( token) => {
        console.log( token)
        const response = await axiosApi.get<TrackHistoryApi[]>('/trackHistory',
             { headers: { Authorization: `_bearer ${token}` }});
        console.log(response.data)
        return response.data;
    }
);

