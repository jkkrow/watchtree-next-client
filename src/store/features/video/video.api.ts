import { appApi } from '@/store/app/api';
import {
  applyLocalHistory,
  applyLocalHistories,
} from '@/services/history.service';
import {
  GetVideoResponse,
  GetVideosRequest,
  GetVideosResponse,
  SearchVideosRequest,
  SearchVideosResponse,
  GetCreatedVideoResponse,
  GetCreatedVideosResponse,
} from './video.type';

const videoApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query<GetVideoResponse, string>({
      query: (id) => ({ url: `video-tree/${id}` }),
      transformResponse: async (data: GetVideoResponse, meta) => {
        const isLocal = meta && !meta.userId && meta.environment === 'client';
        const videoTree = isLocal
          ? await applyLocalHistory(data.videoTree)
          : data.videoTree;
        return { videoTree };
      },
      providesTags: (_, __, id) => [{ type: 'Video', id }, 'User'],
    }),

    getVideos: builder.query<GetVideosResponse, GetVideosRequest>({
      query: (params) => ({ url: 'video-trees', params }),
      transformResponse: async (data: GetVideosResponse, meta) => {
        const isLocal = meta && !meta.userId && meta.environment === 'client';
        const videoTrees = isLocal
          ? await applyLocalHistories(data.videoTrees)
          : data.videoTrees;
        return { videoTrees, token: data.token };
      },
      providesTags: (result) => [
        ...(result
          ? result.videoTrees.map(({ id }) => ({ type: 'Video' as const, id }))
          : []),
        { type: 'Video', id: 'LIST' },
        'User',
      ],
    }),

    searchVideos: builder.query<SearchVideosResponse, SearchVideosRequest>({
      query: (params) => ({ url: 'video-trees/search', params }),
      transformResponse: async (data: SearchVideosResponse, meta) => {
        const isLocal = meta && !meta.userId && meta.environment === 'client';
        const videoTrees = isLocal
          ? await applyLocalHistories(data.videoTrees)
          : data.videoTrees;
        return { videoTrees, count: data.count };
      },
      providesTags: (result) => [
        ...(result
          ? result.videoTrees.map(({ id }) => ({ type: 'Video' as const, id }))
          : []),
        { type: 'Video', id: 'LIST' },
        'User',
      ],
    }),

    getCreatedVideo: builder.query<GetCreatedVideoResponse, string>({
      query: (id) => ({ url: `users/current/video-trees/${id}` }),
      providesTags: (_, __, id) => [{ type: 'Video', id }],
    }),

    getCreatedVideos: builder.query<GetCreatedVideosResponse, void>({
      query: () => ({ url: 'users/current/video-trees' }),
      providesTags: (result) => [
        ...(result
          ? result.videoTrees.map(({ id }) => ({ type: 'Video' as const, id }))
          : []),
        { type: 'Video', id: 'LIST' },
        'User',
      ],
    }),

    createVideoTree: builder.mutation({
      query: () => ({ url: 'video-trees', method: 'POST' }),
      invalidatesTags: ['Video'],
    }),

    deleteVideoTree: builder.mutation({
      query: (id: string) => ({ url: `video-trees/${id}`, method: 'DELETE' }),
      invalidatesTags: (_, __, arg) => [
        { type: 'Video', id: arg },
        { type: 'Video', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetVideosQuery, useGetCreatedVideoQuery } = videoApi;
export const { getVideos, getCreatedVideo } = videoApi.endpoints;
