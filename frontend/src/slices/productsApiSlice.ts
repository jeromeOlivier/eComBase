import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, PRODUCTS_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const productsApiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL, method: "GET" }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (productId: string) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
