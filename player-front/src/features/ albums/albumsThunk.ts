import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {AlbumsApi} from "../../types";

export const getAlbumsList = createAsyncThunk<AlbumsApi[], string | null>(
    'albums',
    async (artistName) => {
        let response;
        response = await axiosApi.get<AlbumsApi[]>('/albums');
        if(artistName){
            response = await axiosApi.get<AlbumsApi[]>(`/albums?artist=${artistName}`);
        }
        return response.data;
    }
);
