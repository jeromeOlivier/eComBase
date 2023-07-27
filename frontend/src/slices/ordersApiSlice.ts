import { apiSlice } from "./apiSlice";
import { CartStateType } from "../types/CartStateType";
import { ORDERS_URL } from "../constants";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order: CartStateType) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
