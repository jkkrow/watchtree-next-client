import { appApi } from '@/store/app/api';

export const uploadApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadVideo: builder.mutation({
      query: (id: string) => ({ url: `upload/${id}` }),
    }),
  }),
});

export const { useUploadVideoMutation } = uploadApi;
