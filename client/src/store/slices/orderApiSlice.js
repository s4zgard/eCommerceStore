import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/create`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/paid/${orderId}`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPaypalId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/all`,
      }),
      keepUnusedDataFor: 5,
    }),
    delivereOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/deliver/${orderId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetPaypalIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDelivereOrderMutation,
} = orderApiSlice;
