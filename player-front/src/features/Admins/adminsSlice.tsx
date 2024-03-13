import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {AdminsAlbumsApi, GlobalError} from "../../types";
import {
    getAdminsAlbumsList,
} from "./adminsThunk.tsx";

interface AdminsState {
    albumsList: AdminsAlbumsApi[][];
    fetchLoading: boolean;
    fetchError: GlobalError | null;



}

const initialState: AdminsState = {
    albumsList: [] ,
    fetchLoading: false,
    fetchError: null,



}
const adminsSlice = createSlice({
    name: 'admins/albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminsAlbumsList.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(getAdminsAlbumsList.fulfilled, (state, {payload: albums}) => {
            state.fetchLoading = false;
            state.albumsList = albums;
            })
            .addCase(getAdminsAlbumsList.rejected, (state, {payload: data}) => {
                state.fetchLoading = false;
                state.fetchError = data || null;
            })




    }
});

export const adminsReducer = adminsSlice.reducer;

export const selectList = (state: RootState) => state.admins.albumsList
export const selectListFetching = (state: RootState) => state.admins.fetchLoading;




