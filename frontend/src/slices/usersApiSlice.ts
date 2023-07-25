import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice.ts";
import { UserType } from "../types/UserType.ts";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data: UserType) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
