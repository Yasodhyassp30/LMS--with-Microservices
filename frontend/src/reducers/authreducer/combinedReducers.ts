import { authSlice } from "./authReducer";
import { combineReducers } from "redux";

const combinedReducers = combineReducers({
    auth: authSlice.reducer
})

export default combinedReducers;
export type RootState = ReturnType<typeof combinedReducers>;