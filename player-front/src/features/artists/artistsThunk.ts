import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {ArtistApi} from "../../types";

export const getArtistsList = createAsyncThunk<ArtistApi[]>(
    'artists',
    async () => {
        const response = await axiosApi.get<ArtistApi[]>('/artists');
        return response.data;
    }
);
export const getOneArtist = createAsyncThunk<ArtistApi, string>(
    'artists/fetchOne',
    async (id) => {
        const response = await axiosApi.get<ArtistApi>(`/artists/${id}`);
        return response.data;
    }
);