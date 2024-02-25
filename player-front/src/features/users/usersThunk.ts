import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterMutation, RegisterResponse, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const registerUser = createAsyncThunk<RegisterResponse, RegisterMutation, {
    rejectValue: ValidationError
}>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try{
            const response = await axiosApi.post('/users', registerMutation);
            return response.data;
        }
        catch (e) {
           if(isAxiosError(e) && e.response && e.response.status === 422){
               return rejectWithValue(e.response.data)
           }
        }

    }
);
export const loginUser = createAsyncThunk<RegisterResponse, LoginMutation, { rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try{
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
            return response.data;
        }catch (e) {
            if(isAxiosError(e) && e.response && e.response.status === 422){
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);