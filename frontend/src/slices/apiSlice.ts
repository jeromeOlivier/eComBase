import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.ts";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// slices are parts of the store object that can be dynamically updated
export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["User", "Product", "Order"],
  endpoints: () => ({}),
});
