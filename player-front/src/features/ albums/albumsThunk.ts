import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {AlbumMutation, AlbumsApi} from "../../types";

export const getAlbumsList = createAsyncThunk<AlbumsApi[], string | undefined>(
    'albums/fetch',
    async (artistName) => {
        let response;
        try{
            if(artistName){
                response = await axiosApi.get<AlbumsApi[]>(`/albums?artist=${artistName}`);
            }else{
                response = await axiosApi.get<AlbumsApi[]>('/albums');
            }
            return response.data;
        }catch (e) {
            throw e;
        }

    }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
    'albums/create',
    async (albumMutation) => {
        try{
            const formData = new FormData();

            const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
            keys.forEach(key => {
                const value = albumMutation[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });
            const response = await axiosApi.post('/albums', formData);
            return response.data;
        }catch (e) {
            throw e;
        }

    }
);