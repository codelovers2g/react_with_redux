/**
 * Latest Version Used: Redux Toolkit 2.11.2, React 19.2.5
 * File Purpose: RTK Query API for Product Management
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Modern RTK Query: Using automated revalidation and tag system
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com/v1/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Products', id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    updateInventory: builder.mutation({
      query: ({ id, delta }) => ({
        url: `products/${id}/inventory`,
        method: 'PATCH',
        body: { delta },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductByIdQuery, 
  useUpdateInventoryMutation 
} = productsApi;
