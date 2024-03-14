import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {ArtistApi, ArtistMutation, GlobalError} from "../../types";
import {isAxiosError} from "axios";

export const getArtistsList = createAsyncThunk<ArtistApi[]>(
    'artists',
    async () => {
        const response = await axiosApi.get<ArtistApi[]>('/artists');
        return response.data;
    }
);
export const createArtist = createAsyncThunk<void, ArtistMutation,{ rejectValue: GlobalError}>(
    'artists/create',
    async (artistMutation, {rejectWithValue}) => {
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
            if(isAxiosError(e) && e.response ){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    }
);
export const updateArtistPublished = createAsyncThunk<void, string,{ rejectValue: GlobalError}>(
    'artists/toggle',
    async (id, {rejectWithValue}) => {
        try{
            const response = await axiosApi.patch(`/artists/${id}/togglePublished`);
            return response.data;
        }catch (e) {
            if(isAxiosError(e) && e.response ){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);
export const deleteArtist = createAsyncThunk<void, string, { rejectValue: GlobalError}>(
    'artists/delete',
    async (id, {rejectWithValue}) => {
        try{
            await axiosApi.delete(`/artists/${id}`);
        }catch (e) {
            if(isAxiosError(e) && e.response ){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);