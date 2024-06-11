import { USERS_URL } from "../constants";
import { apiSlice } from "./";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    signOut: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/signout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useSignInMutation, useSignOutMutation } = userApiSlice;
