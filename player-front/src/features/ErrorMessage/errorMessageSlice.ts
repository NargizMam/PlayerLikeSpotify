import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";

interface ErrorMessageState {
    showSnackBar: boolean
}
const initialState: ErrorMessageState = {
    showSnackBar: false
}
const errorMessageSlice = createSlice({
    name: 'errorMessage',
    initialState,
    reducers: {
        openSnackBar: (state) => {
            state.showSnackBar = !state.showSnackBar;
        }
    }
});
export const errorMessageReducer = errorMessageSlice.reducer;

export const { openSnackBar} = errorMessageSlice.actions;
export const selectShowSnackBar = (state: RootState) => state.errorMessage.showSnackBar;
