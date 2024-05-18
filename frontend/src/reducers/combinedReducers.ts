import { classApi } from "./classReducer/classApis";
import { authSlice } from "./authreducer/authReducer";
import { combineReducers, Reducer } from "redux";
import { authApi } from "./authreducer/authApis";

const combinedReducers: Reducer = combineReducers({
    auth: authSlice.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [authApi.reducerPath]: authApi.reducer

    
})

export default combinedReducers;
export type RootState = ReturnType<typeof combinedReducers>;