import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RootState } from '../authreducer/combinedReducers';

export const classApi = createApi({
    reducerPath: 'classApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/class',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if(token){
            headers.set('authorization',`Bearer ${token}`);
        }
        return headers;
    }
    }),
    endpoints: (builder) => ({
        getClasses: builder.query({
            query: () => '/'
        }),
        createClass: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body
            })
        }),
        getClassesTeacher: builder.query({
            query: (id) => ({
                url: `/teacher/${id}`,
                method: 'GET',
            })
        }),
        getClassesStudent: builder.query({
            query: (id) => ({
                url: `/student/classes/${id}`,
                method: 'GET',
            })
        })
    })

})

export const {useGetClassesQuery,useCreateClassMutation,useGetClassesTeacherQuery,useGetClassesStudentQuery} = classApi;