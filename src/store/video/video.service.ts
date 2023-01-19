import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { videoSlice } from './video.slice';

export const videoApi = createApi({
  reducerPath: `api/${videoSlice.name}`,
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getCreatedVideo: builder.query({
      query: (id: string) => `videos/${id}`,
    }),
  }),
});

export const { useGetCreatedVideoQuery } = videoApi;
