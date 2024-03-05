import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store.ts";

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
export const logout = createAsyncThunk<void, undefined, {state: RootState}>(
    'users/logout',
    async (_, {getState}) =>{
   const token = getState().users.user?.token;
   await axiosApi.delete('/users/sessions', {headers: {'Authorization': '_bearer' + token}});
    }
);