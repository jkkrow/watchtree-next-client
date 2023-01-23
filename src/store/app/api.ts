import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const appApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.SERVER_URL }),
  endpoints: () => ({}),
});
