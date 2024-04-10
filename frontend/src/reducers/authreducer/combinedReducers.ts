import { classApi } from "../classReducer/classApis";
import { authSlice } from "./authReducer";
import { combineReducers, Reducer } from "redux";

const combinedReducers: Reducer = combineReducers({
    auth: authSlice.reducer,
    [classApi.reducerPath]: classApi.reducer

    
})

export default combinedReducers;
export type RootState = ReturnType<typeof combinedReducers>;