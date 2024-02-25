import {User, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {registerUser} from "./usersThunk.ts";
import {RootState} from "../../app/store.ts";

interface UsersState {
    user: User | null;
    registerLoading: boolean;
    registerError: ValidationError | null;
}
const initialState: UsersState = {
    user: null,
    registerLoading: false,
    registerError: null
}
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logOutUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.registerLoading = true;
            state.registerError = null;
        });
        builder.addCase(registerUser.fulfilled, (state, {payload: data}) => {
            state.registerLoading = false;
            state.user = data.user;
        });
        builder.addCase(registerUser.rejected, (state, {payload: error}) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });
    })
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const { logOutUser} = usersSlice.actions;
export const selectRegisterLoading = (state: RootState) => state.user.registerLoading;
export const selectRegisterError = (state: RootState) => state.user.registerError;
