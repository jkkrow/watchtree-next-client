import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { uploadSlice } from './upload.slice';

export const uploadApi = createApi({
  reducerPath: `api/${uploadSlice.name}`,
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    uploadVideo: builder.mutation({
      query: (id: string) => ({ url: `upload/${id}` }),
    }),
  }),
});

export const { useUploadVideoMutation } = uploadApi;
