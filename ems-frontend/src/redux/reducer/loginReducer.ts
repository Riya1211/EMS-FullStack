import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";

const initialState: UserReducerInitialState = {
    user: null,
    loading: false
};

export const loginReducer = createSlice({
    name: "loginReducer",
    initialState,
    reducers: {
        userExist: (state, action:PayloadAction<User>) =>{
            state.loading = false;
            state.user = action.payload;
        },
        userNotExist: (state) =>{
            state.loading = false;
            state.user = null;
        }
    },
});

export const {userExist, userNotExist} = loginReducer.actions;