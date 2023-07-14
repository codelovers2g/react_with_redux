import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BaseHeader from "../baseHeader/baseHeader";

export const getAllUsers = createApi({
  reducerPath: "getAllUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_BASE_URL + "user",
    prepareHeaders: (headers, { getState }) => {
      BaseHeader(headers, { getState });
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/edit/${data.userId}`,
        method: "PUT",
        body: data.data,
      }),
    }),
    getAllUsers: builder.query({
      query: ({ searchEmployee, currentPage, pageSize, sortModel }) =>
        `/getAll?search=${searchEmployee}&page=${currentPage}&limit=${pageSize}&sortBy=${
          sortModel[0] ? sortModel[0].field : "createdAt"
        }&sortOrder=${sortModel[0] ? sortModel[0].sort : "desc"}`,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/delete/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `/getUserById/${userId}`,
      }),
    }),
    getIdNames: builder.query({
      query: () => ({
        url: `getIdName`,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useLazyGetUserByIdQuery,
  useGetIdNamesQuery,
} = getAllUsers;
