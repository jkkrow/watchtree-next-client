import { AppBaseQueryError, AppState } from '@/store';
import { appApi } from '@/store/app/api';
import { getInfiniteQueryOptions } from '@/store/common/api.util';
import { findAncestors, findNodeById } from '../video/video.util';
import {
  getLocalHistories,
  saveLocalHistory,
  deleteLocalHistory,
  sortByLocalHistory,
  clearLocalHistoy,
} from '@/services/history.service';
import { MessageResponse } from '@/store/common/api.type';
import { GetVideosResponse } from '../video/video.type';
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
        const customArg = { url: 'video-trees', params: { ids } };
        const { data, error } = await baseQuery(customArg);

        if (error) return { error };
        const { items: videos } = data as GetVideosResponse;
        const items = await sortByLocalHistory(videos, localHistories);
        const customData = { items, token } as GetHistoriesResponse;

        return { data: customData };
      },
      providesTags: () => [{ type: 'History', id: 'LIST' }, 'Auth'],
      ...getInfiniteQueryOptions(),
    }),

    getRecentHistories: builder.query<
      GetHistoriesResponse,
      GetHistoriesRequest
    >({
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
        const customArg = { url: 'video-trees', params: { ids } };
        const { data, error } = await baseQuery(customArg);

        if (error) return { error };
        const { items: videos } = data as GetVideosResponse;
        const items = await sortByLocalHistory(videos, localHistories);
        const customData = { items, token } as GetHistoriesResponse;

        return { data: customData };
      },
      providesTags: () => [{ type: 'History', id: 'LIST' }, 'Auth'],
    }),

    saveHistory: builder.mutation<MessageResponse, SaveHistoryRequest>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const error = { status: 400, data: { message: 'Invalid request' } };
        const videoState = (api.getState() as AppState).video;
        const { info } = (api.getState() as AppState).user;
        const { activeNodeId, initialProgress, currentProgress, videoTree } =
          videoState;

        if (!videoTree || !activeNodeId || videoTree.id !== arg.videoId) {
          return { error } as { error: AppBaseQueryError };
        }

        const activeNode = findNodeById(videoTree.root, activeNodeId);
        if (!activeNode) {
          return { error } as { error: AppBaseQueryError };
        }

        const threshold =
          activeNode.duration * 0.95 > activeNode.duration - 10
            ? activeNode.duration - 10
            : activeNode.duration * 0.95;
        const isLastVideo = activeNode.children.length === 0;
        const endAt = activeNode.duration - threshold > 180 ? 180 : threshold;

        const previousNodes = findAncestors(videoTree.root, activeNode.id);
        const previousProgress = previousNodes.reduce(
          (acc, cur) => acc + (cur.duration || 0),
          0
        );

        const progress = arg.unmount ? currentProgress : initialProgress || 0;
        const totalProgress = progress + previousProgress;
        const ended = isLastVideo && progress > endAt ? true : false;
        const params = { activeNodeId, progress, totalProgress, ended };

        if (info) {
          const customArg = {
            url: `histories/${videoTree.id}`,
            data: params,
            method: 'put',
          };
          return baseQuery(customArg) as { data: MessageResponse };
        }

        await saveLocalHistory({ videoId: videoTree.id, ...params });
        const data = { message: 'History saved successfully' };
        const meta = { extraOptions };
        return { data, meta };
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
      invalidatesTags: () => ['History'],
    }),
  }),
});

export const {
  useGetHistoriesQuery,
  useGetRecentHistoriesQuery,
  useSaveHistoryMutation,
  useDeleteHistoryMutation,
  useClearHistoryMutation,
} = historyApi;

export const {
  getHistories,
  getRecentHistories,
  saveHistory,
  deleteHistory,
  clearHistory,
} = historyApi.endpoints;
