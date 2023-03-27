import { AppState } from '@/store';
import { appApi } from '@/store/app/api';
import { getInfiniteQueryOptions } from '@/store/common/api.util';
import {
  getLocalHistories,
  saveLocalHistory,
  deleteLocalHistory,
  sortByLocalHistory,
  clearLocalHistoy,
} from '@/services/history.service';
import { MessageResponse } from '@/store/common/api.type';
import { GetVideosResponse, VideoTreeWithData } from '../video/video.type';
import {
  GetHistoriesRequest,
  GetHistoriesResponse,
  SaveHistoryRequest,
} from './history.type';

const historyApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getHistories: builder.query<GetHistoriesResponse, GetHistoriesRequest>({
      queryFn: async (arg, api, _, baseQuery) => {
        const { info } = (api.getState() as AppState).user;
        const emptyResult = { data: { items: [], token: null } };

        if (info) {
          const customArg = { url: 'channels/current/histories', params: arg };
          return baseQuery(customArg) as { data: GetHistoriesResponse };
        }

        if (typeof window === 'undefined') return emptyResult;
        const { localHistories, token } = await getLocalHistories(arg);
        const ids = localHistories.map((history) => history.videoId);

        if (!ids.length) return emptyResult;
        const customArg = { url: 'video-trees', params: { ...arg, ids } };
        const { data, error } = await baseQuery(customArg);

        if (error) return { error };
        const { items: videos } = data as GetVideosResponse;
        const items = await sortByLocalHistory(videos, localHistories);
        const customData = { items, token } as GetHistoriesResponse;

        return { data: customData };
      },
      providesTags: (result) => [
        ...(result
          ? result.items
              .filter((item): item is VideoTreeWithData => !!item)
              .map(({ id }) => ({ type: 'History' as const, id }))
          : []),
        { type: 'History', id: 'LIST' },
        'User',
      ],
      ...getInfiniteQueryOptions(),
    }),

    saveHistory: builder.mutation<MessageResponse, SaveHistoryRequest>({
      queryFn: async (arg, api, _, baseQuery) => {
        const { info } = (api.getState() as AppState).user;

        if (info) {
          const { videoId, ...rest } = arg;
          const customArg = {
            url: `histories/${videoId}`,
            data: rest,
            method: 'put',
          };
          return baseQuery(customArg) as { data: MessageResponse };
        }

        await saveLocalHistory(arg);
        return { data: { message: 'History saved successfully' } };
      },
      extraOptions: { ignoreMessage: true },
      invalidatesTags: (_, __, { videoId: id }) => [
        { type: 'History', id },
        { type: 'History', id: 'LIST' },
      ],
    }),

    deleteHistory: builder.mutation<MessageResponse, string>({
      queryFn: async (arg, api, _, baseQuery) => {
        const { info } = (api.getState() as AppState).user;

        if (info) {
          const customArg = { url: `histories/${arg}`, method: 'delete' };
          return baseQuery(customArg) as { data: MessageResponse };
        }

        await deleteLocalHistory(arg);
        return { data: { message: 'History deleted successfully' } };
      },
      invalidatesTags: (_, __, id) => [
        { type: 'History', id },
        { type: 'History', id: 'LIST' },
      ],
    }),

    clearHistory: builder.mutation<MessageResponse, void>({
      queryFn: async (_, api, __, baseQuery) => {
        const { info } = (api.getState() as AppState).user;

        if (info) {
          const customArg = {
            url: `channels/current/histories`,
            method: 'delete',
          };
          return baseQuery(customArg) as { data: MessageResponse };
        }

        await clearLocalHistoy();
        return { data: { message: 'Histories deleted successfully' } };
      },
      invalidatesTags: () => [{ type: 'History', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetHistoriesQuery,
  useSaveHistoryMutation,
  useDeleteHistoryMutation,
  useClearHistoryMutation,
} = historyApi;
export const { getHistories, saveHistory, deleteHistory, clearHistory } =
  historyApi.endpoints;
