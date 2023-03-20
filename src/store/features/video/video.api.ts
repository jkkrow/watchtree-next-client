import { appApi } from '@/store/app/api';
import { getInfiniteQueryOptions } from '@/store/common/api.util';
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
  GetCreatedVideosRequest,
  GetCreatedVideosResponse,
} from './video.type';

const videoApi = appApi.injectEndpoints({
  overrideExisting: true,
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
    }),

    getVideos: builder.query<GetVideosResponse, GetVideosRequest>({
      query: (params) => ({ url: 'video-trees', params }),
      transformResponse: async (data: GetVideosResponse, meta) => {
        const isLocal = meta && !meta.userId && meta.environment === 'client';
        const items = isLocal
          ? await applyLocalHistories(data.items)
          : data.items;
        return { items, token: data.token };
      },
      providesTags: (result) => [
        ...(result
          ? result.items.map(({ id }) => ({ type: 'Video' as const, id }))
          : []),
        { type: 'Video', id: 'LIST' },
        'User',
      ],
      ...getInfiniteQueryOptions(),
    }),

    searchVideos: builder.query<SearchVideosResponse, SearchVideosRequest>({
      query: (params) => ({ url: 'video-trees/search', params }),
      transformResponse: async (data: SearchVideosResponse, meta) => {
        const isLocal = meta && !meta.userId && meta.environment === 'client';
        const items = isLocal
          ? await applyLocalHistories(data.items)
          : data.items;
        return { items, count: data.count };
      },
      providesTags: (result) => [
        ...(result
          ? result.items.map(({ id }) => ({ type: 'Video' as const, id }))
          : []),
        { type: 'Video', id: 'LIST' },
        'User',
      ],
    }),

    getCreatedVideos: builder.query<
      GetCreatedVideosResponse,
      GetCreatedVideosRequest
    >({
      query: (params) => ({ url: 'channels/current/video-trees', params }),
      providesTags: (result) => [
        ...(result
          ? result.items.map(({ id }) => ({ type: 'Video' as const, id }))
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
