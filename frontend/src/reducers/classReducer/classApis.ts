import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../authreducer/combinedReducers";
import JoinClass from "../../components/classes/students/joinClass";
import AddStudent from "../../components/classes/teacher/addStudent";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/class",
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
        url: `/teacher/${id}`,
        method: "GET",
      }),
      providesTags: ["Class"],
    }),
    getClassesStudent: builder.query({
      query: (id) => ({
        url: `/student/classes/${id}`,
        method: "GET",
      }),
      providesTags: ["Class"],
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
        url: `/student/${id}`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),
    JoinClass: builder.mutation({
      query: ({ id, body }) => ({
        url: `/student/join/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Class"],
    }),
    leaveClass: builder.mutation({
      query: ({ id, body }) => ({
        url: `/student/leave/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Class"],
    }),
    removeStudent: builder.mutation({
      query: ({ cid, sid }) => ({
        url: `/teacher/remove/${cid}/${sid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Class"],
    }),
    AddStudent: builder.mutation({
        query: ({ cid, body }) => ({
            url: `/teacher/student/${cid}`,
            method: "POST",
            body,
        }),
        invalidatesTags: ["Class"],
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
