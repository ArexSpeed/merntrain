import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// get x-keys from options in rapidApi (test endpoint -> code snippet) [42:00]
const cryptoApiHeader = {
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeader })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest('/coins')
    })
  })
})

export const {
  useGetCryptosQuery
} = cryptoApi;
