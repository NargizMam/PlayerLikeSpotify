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
            console.log(response.data)
               return response.data;
        }catch (e) {
            if(isAxiosError(e) && e.response ){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    }
);