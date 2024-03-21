import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://date.nager.at/',
});

export const api = createApi({
  reducerPath: 'holidays',
  baseQuery,
  tagTypes: ['Holidays'],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({}),
});
