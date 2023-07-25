import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice.ts";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (productId: string) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
