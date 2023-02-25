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
      forceRefetch: () => true,
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
      merge: (previousResult, { videoTrees, token }) => {
        previousResult.videoTrees.push(...videoTrees);
        previousResult.token = token;
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName + queryArgs.max;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return !!currentArg?.token && currentArg !== previousArg;
      },
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

    getCreatedVideos: builder.query<GetCreatedVideosResponse, void>({
      query: () => ({ url: 'channels/current/video-trees' }),
      providesTags: (result) => [
        ...(result
          ? result.videoTrees.map(({ id }) => ({ type: 'Video' as const, id }))
          : []),
        { type: 'Video', id: 'LIST' },
        'User',
      ],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useGetVideosQuery,
  useSearchVideosQuery,
  useGetCreatedVideosQuery,
} = videoApi;

export const { getVideo, getVideos, searchVideos, getCreatedVideos } =
  videoApi.endpoints;
