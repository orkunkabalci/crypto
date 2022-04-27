import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoOrdersHeaders = {
    "X-RapidAPI-Host": "binance43.p.rapidapi.com",
    "X-RapidAPI-Key": "a67c8a23dfmshc7ada331b554263p143229jsndb34f251cca9",
};

const createRequest = (url) => ({ url, headers: cryptoOrdersHeaders });

export const cryptoOrdersApi = createApi({
  reducerPath: 'cryptoOrdersApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://binance43.p.rapidapi.com" }),
  
  endpoints: (builder) => ({
    getCryptoOrders: builder.query({
      query: ( coinName ) => createRequest(`/depth?symbol=${coinName}USDT`),
    }),
  }),
});

export const { useGetCryptoOrdersQuery } = cryptoOrdersApi;