import { appApi } from '@/store/app/api';
import { getInfiniteQueryOptions } from '@/store/common/api.util';
import {
  applyLocalHistory,
  applyLocalHistories,
} from '@/services/history.service';
import { MessageResponse } from '@/store/common/api.type';
import {
  GetVideoResponse,
  GetVideosRequest,
  GetVideosResponse,
  SearchVideosRequest,
  SearchVideosResponse,
  GetCreatedVideosRequest,
  GetCreatedVideosResponse,
  GetFavoritesRequest,
  GetFavoritesResponse,
} from './video.type';
import { AppState } from '@/store';

const videoApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    watchVideo: builder.query<GetVideoResponse, string>({
      queryFn: async (id, { getState }, _, baseQuery) => {
        const store = getState() as AppState;
        const cache = videoApi.endpoints.getVideo.select(id)(store) as {
          data: GetVideoResponse | undefined;
        };

        if (cache.data) return { data: cache.data };
        const { data, error } = await baseQuery({ url: `video-trees/${id}` });

        if (error) return { error };
        const { videoTree: videoData } = data as GetVideoResponse;
        const isLocal = !store.user.info && typeof window !== 'undefined';
        const videoTree = isLocal
          ? await applyLocalHistory(videoData)
          : videoData;

        return { data: { videoTree } } as { data: GetVideoResponse };
      },
      forceRefetch: () => true,
      providesTags: (_, __, id) => [{ type: 'Video', id }, 'Auth'],
    }),

    getVideo: builder.query<GetVideoResponse, string>({
      query: (id) => ({ url: `video-trees/${id}` }),
      transformResponse: async (data: GetVideoResponse, meta) => {
        const isLocal = meta && !meta.userId && meta.environment === 'client';
        const videoTree = isLocal
          ? await applyLocalHistory(data.videoTree)
          : data.videoTree;
        return { videoTree };
      },
      providesTags: (_, __, id) => [
        { type: 'Video', id },
        { type: 'History', id },
        'Auth',
      ],
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
      providesTags: () => [
        { type: 'Video', id: 'LIST' },
        { type: 'History', id: 'LIST' },
        'Auth',
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
      providesTags: () => [
        { type: 'Video', id: 'LIST' },
        { type: 'History', id: 'LIST' },
        'Auth',
      ],
    }),

    getCreatedVideos: builder.query<
      GetCreatedVideosResponse,
      GetCreatedVideosRequest
    >({
      query: (params) => ({ url: 'channels/current/video-trees', params }),
      providesTags: () => [{ type: 'Video', id: 'LIST' }, 'User'],
    }),

    getFavorites: builder.query<GetFavoritesResponse, GetFavoritesRequest>({
      query: (params) => ({ url: 'channels/current/favorites', params }),
      providesTags: () => [
        { type: 'Video', id: 'LIST' },
        { type: 'History', id: 'LIST' },
        'User',
      ],
    }),

    addToFavorites: builder.mutation<MessageResponse, string>({
      query: (id) => ({ url: `video-trees/${id}/favorites`, method: 'post' }),
      invalidatesTags: (_, __, id) => [
        { type: 'Video', id },
        { type: 'Video', id: 'LIST' },
      ],
    }),

    removeFromFavorites: builder.mutation<MessageResponse, string>({
      query: (id) => ({ url: `video-trees/${id}/favorites`, method: 'delete' }),
      invalidatesTags: (_, __, id) => [
        { type: 'Video', id },
        { type: 'Video', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useWatchVideoQuery,
  useGetVideoQuery,
  useLazyGetVideoQuery,
  useGetVideosQuery,
  useSearchVideosQuery,
  useGetCreatedVideosQuery,
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = videoApi;
export const {
  watchVideo,
  getVideo,
  getVideos,
  searchVideos,
  getCreatedVideos,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} = videoApi.endpoints;
