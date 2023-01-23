import { appApi } from '@/store/app/api';
import { GetVideosResult } from './video.dto';

const videoApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query<GetVideosResult, unknown>({
      query: () => ({ url: `http://localhost:5000/video-trees` }),
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
