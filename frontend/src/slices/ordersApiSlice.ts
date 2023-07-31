import { apiSlice } from "./apiSlice";
import { Cart } from "../types/Cart.ts";
import { ORDERS_URL } from "../constants";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order: Cart) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
