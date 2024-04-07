
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    role:"",
    id:"",
    token:"",
    email:"",
    username:""
  }

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setLogged(state, action){
            if(localStorage.getItem("user")){
                const userFromStore  = JSON.parse(localStorage.getItem("user") as string);
                state.role = userFromStore.role;
                state.id = userFromStore.uid;
                state.email = userFromStore.email;
                state.token = userFromStore.token;
                state.username = userFromStore.username;
            }
        },

        logout(state, action){
            state.role = "";
            state.id = "";
            state.email = "";
            state.token = "";
            state.username = "";
            localStorage.removeItem("user");
        }
    }
})