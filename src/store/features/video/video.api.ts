import { appApi } from '@/store/app/api';
import { GetVideosResult } from './video.type';

const videoApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query<GetVideosResult, void>({
      query: () => ({ url: `video-trees` }),
      providesTags: ['User'],
    }),
    getCreatedVideo: builder.query({
      query: (id: string) => ({ url: `users/current/video-trees/${id}` }),
    }),
    deleteCreatedVideo: builder.mutation({
      query: (id: string) => ({ url: `videos/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const { useGetVideosQuery, useGetCreatedVideoQuery } = videoApi;
export const { getVideos, getCreatedVideo } = videoApi.endpoints;
