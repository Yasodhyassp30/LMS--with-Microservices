import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../combinedReducers";

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8080/auth",
        prepareHeaders:(headers,{getState}) => {
            const token = (getState() as RootState).auth.token
            if(token){
                headers.set("authorization",`Bearer ${token}`)
            }
            return headers
        }
    
    }),

    tagTypes:["Auth"],

    endpoints:(builder) => ({
        getUserFromId:builder.query({
        
        query:(id) => ({
            url:`/user/sid/${id}`,
            method:"GET"
        }),
            providesTags:["Auth"],
        }),
        })
    })


    export const {useGetUserFromIdQuery} = authApi