import {User, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {registerUser} from "./usersThunk.ts";

interface userState {
    user: User | null;
    registerLoading: boolean;
    registerError: ValidationError | null;
}
const initialState: userState = {
    user: null,
    registerLoading: false,
    registerError: null
}
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.registerLoading = true;
            state.registerError = null;
        });
        builder.addCase(registerUser.fulfilled, (state, {payload: user}) => {
            state.registerLoading = false;
            state.registerError = null;
            state.user = user.user;
        });
        builder.addCase(registerUser.rejected, (state, {payload: error}) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });
    }

});

export const usersReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;