import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {AlbumsApi} from "../../types";

export const getAlbumsList = createAsyncThunk<AlbumsApi[], string>(
    'albums',
    async (artistName) => {
        const response = await axiosApi.get<AlbumsApi[]>(`albums?artist=${artistName}`);
        return response.data;
    }
);
