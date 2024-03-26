import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants';
import { ROUTES } from '../../utils/routes';

export const apiPostSlice = createApi({
  reducerPath: 'postSlice',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    orderDiscount: build.mutation({
      query: (product) => ({
        url: ROUTES.ORDER_DISCOUNT,
        method: 'POST',
        body: product,
      }),
    }),
    orderProduct: build.mutation({
      query: (product) => ({
        url: ROUTES.ORDER_PRODUCT,
        method: 'POST',
        body: product,
      }),
    }),
  }),
});

export const { useOrderDiscountMutation, useOrderProductMutation } =
  apiPostSlice;
