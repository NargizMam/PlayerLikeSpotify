import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {ArtistApi, ArtistMutation} from "../../types";

export const getArtistsList = createAsyncThunk<ArtistApi[]>(
    'artists',
    async () => {
        const response = await axiosApi.get<ArtistApi[]>('/artists');
        return response.data;
    }
);
export const createArtist = createAsyncThunk<void, ArtistMutation>(
    'artists/create',
    async (artistMutation) => {
        try{
            const formData = new FormData();

            const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
            keys.forEach(key => {
                const value = artistMutation[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });
            const response = await axiosApi.post('/artists', formData);
            return response.data;
        }catch (e) {
            throw e;
        }

    }
);
