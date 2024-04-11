import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants';

export const apiGoodsSlice = createApi({
  reducerPath: 'goods',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllGoods: builder.query({
      query: () => '/products/all',
    }),
    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllGoodsQuery, useGetSingleProductQuery } = apiGoodsSlice;
