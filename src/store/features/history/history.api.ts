import { AppState } from '@/store';
import { appApi } from '@/store/app/api';

import {
  getLocalHistories,
  saveLocalHistory,
  deleteLocalHistory,
  sortByLocalHistory,
} from '@/services/history.service';
import { MessageResponse } from '@/store/common/common.type';
import { GetVideosResponse, VideoTreeWithData } from '../video/video.type';
import {
  GetHistoriesRequest,
  GetHistoriesResponse,
  SaveHistoryRequest,
} from './history.type';

const historyApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getHistories: builder.query<GetHistoriesResponse, GetHistoriesRequest>({
      queryFn: async (arg, api, _, baseQuery) => {
        const { info } = (api.getState() as AppState).user;

        if (info) {
          const customArg = { url: 'channels/current/histories', params: arg };
          return baseQuery(customArg) as { data: GetHistoriesResponse };
        }

        if (typeof window === 'undefined') {
          return { data: { videoTrees: [], token: null } };
        }

        const { localHistories, token } = await getLocalHistories(arg);
        const ids = localHistories.map((history) => history.videoId);

        if (!ids.length) {
          return { data: { videoTrees: [], token: null } };
        }

        const customArg = { url: 'video-trees', params: { ...arg, ids } };
        const { data, error } = await baseQuery(customArg);

        if (error) return { error };
        const { videoTrees: videos } = data as GetVideosResponse;

        const videoTrees = await sortByLocalHistory(videos, localHistories);
        const customData = { videoTrees, token } as GetHistoriesResponse;

        return { data: customData };
      },
      providesTags: (result) => [
        ...(result
          ? result.videoTrees
              .filter((item): item is VideoTreeWithData => !!item)
              .map(({ id }) => ({ type: 'Video' as const, id }))
          : []),
        'User',
      ],
    }),

    saveHistory: builder.mutation<MessageResponse, SaveHistoryRequest>({
      queryFn: async (arg, api, _, baseQuery) => {
        const { info } = (api.getState() as AppState).user;

        if (info) {
          const { videoId, ...rest } = arg;
          const customArg = {
            url: `histories/${videoId}`,
            body: rest,
            method: 'PUT',
          };
          return baseQuery(customArg) as { data: MessageResponse };
        }

        await saveLocalHistory(arg);
        return { data: { message: 'History saved successfully' } };
      },
      extraOptions: { ignoreMessage: true },
      invalidatesTags: (_, __, { videoId }) => [{ type: 'Video', id: videoId }],
    }),

    deleteHistory: builder.mutation<MessageResponse, string>({
      queryFn: async (arg, api, _, baseQuery) => {
        const { info } = (api.getState() as AppState).user;

        if (info) {
          const customArg = { url: `histories/${arg}`, method: 'DELETE' };
          return baseQuery(customArg) as { data: MessageResponse };
        }

        await deleteLocalHistory(arg);
        return { data: { message: 'History deleted successfully' } };
      },
      invalidatesTags: (_, __, id) => [{ type: 'Video', id }],
    }),
  }),
});

export const {
  useGetHistoriesQuery,
  useSaveHistoryMutation,
  useDeleteHistoryMutation,
} = historyApi;

export const { getHistories, saveHistory, deleteHistory } =
  historyApi.endpoints;
