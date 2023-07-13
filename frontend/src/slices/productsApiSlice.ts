import { PRODUCTS_URL } from "../constants.ts";
import { apiSlice } from "./apiSlice.ts";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => `${PRODUCTS_URL}/${id}`,
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
