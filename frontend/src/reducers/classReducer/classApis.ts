import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../combinedReducers";
import JoinClass from "../../components/classes/students/joinClass";
import AddStudent from "../../components/classes/teacher/addStudent";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/classes",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Class", "Student"],
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => "/",
      providesTags: ["Class"],
    }),
    createClass: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Class"],
    }),
    getSingleClass: builder.query({
        query: (id) =>({
            url: `/${id}`,
            method: "GET",  
        }),
        providesTags: ["Class"],
    }),
    getClassesTeacher: builder.query({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "GET",
      }),
      providesTags: ["Class"],
    }),
    getClassesStudent: builder.query({
      query: (id) => ({
        url: `/students/classes/${id}`,
        method: "GET",
      }),
      providesTags: ["Class","Student"],
    }),
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Class"],
    }),
    getStudents: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),
    JoinClass: builder.mutation({
      query: ({ id, body }) => ({
        url: `/students/join/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Class","Student"],
    }),
    leaveClass: builder.mutation({
      query: ({ id, body }) => ({
        url: `/students/leave/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Class","Student"],
    }),
    removeStudent: builder.mutation({
      query: ({ cid, sid }) => ({
        url: `/teachers/removes/${cid}/${sid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    AddStudent: builder.mutation({
        query: ({ cid, body }) => ({
            url: `/teachers/students/${cid}`,
            method: "POST",
            body,
        }),
        invalidatesTags: ["Student"],
    })
  }),
});

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useGetClassesTeacherQuery,
  useGetClassesStudentQuery,
  useDeleteClassMutation,
  useGetStudentsQuery,
    useAddStudentMutation,
  useJoinClassMutation,
  useLeaveClassMutation,
  useRemoveStudentMutation,
  useGetSingleClassQuery
} = classApi;
