project from https://www.youtube.com/watch?v=9DDX3US3kss

redux toolkit 
- for getting api to the store - get query -> https://redux-toolkit.js.org/tutorials/rtk-query
- import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
- useGetCryptosQuery with number count (how many item to get) adding by 
query: (count) => createRequest(`/coins?limit=${count}`)
