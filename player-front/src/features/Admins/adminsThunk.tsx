import {createAsyncThunk} from "@reduxjs/toolkit";
import {AdminsAlbumsApi, GlobalError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const getAdminsAlbumsList = createAsyncThunk<AdminsAlbumsApi[][]  , undefined , { rejectValue: GlobalError}>(
    'admins/fetch',
    async (_, {rejectWithValue}) => {
        let response;
        try{
            response = await axiosApi.get<AdminsAlbumsApi[][] >(`/admins`);
            return response.data;
        }catch (e) {
            if(isAxiosError(e) && e.response ){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    }
);
export const updateAlbumPublished = createAsyncThunk<void, string>(
    'admins/albums/toggle',
    async (id) => {
        try{
           const response = await axiosApi.patch(`/albums/${id}/togglePublished`);
           return response.data;
        }catch (e) {
            throw e;
        }
    }
);
export const updateArtistPublished = createAsyncThunk<void, string>(
    'admins/artists/toggle',
    async (id) => {
        try{
            const response = await axiosApi.patch(`/artists/${id}/togglePublished`);
            return response.data;
        }catch (e) {
            throw e;
        }
    }
);
export const updateTrackPublished = createAsyncThunk<void, string>(
    'admins/tracks/toggle',
    async (id) => {
        try{
            const response = await axiosApi.patch(`/tracks/${id}/togglePublished`);
            return response.data;
        }catch (e) {
            throw e;
        }
    }
);