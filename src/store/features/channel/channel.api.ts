import { appApi } from '@/store/app/api';
import { getInfiniteQueryOptions } from '@/store/common/api.util';
import {
  MessageResponse,
  KeysetPaginationRequest,
  OffsetPaginationRequest,
} from '@/store/common/api.type';
import {
  GetSubscribesResponse,
  GetSubscribersResponse,
  GetChannelResponse,
} from './channel.type';

export const channelApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getChannel: builder.query<GetChannelResponse, string>({
      query: (id) => ({ url: `channels/${id}` }),
      providesTags: ['User', 'Subscription'],
    }),

    getSubscribes: builder.query<
      GetSubscribesResponse,
      KeysetPaginationRequest
    >({
      query: (params) => ({ url: 'channels/current/subscribes', params }),
      providesTags: ['User', 'Subscription'],
      ...getInfiniteQueryOptions(),
    }),

    getSubscribers: builder.query<
      GetSubscribersResponse,
      OffsetPaginationRequest
    >({
      query: (params) => ({ url: 'channels/current/subscribers', params }),
      providesTags: ['User', 'Subscription'],
    }),

    subscribe: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `channels/${id}/subscriptions`,
        method: 'post',
      }),
      invalidatesTags: ['Subscription'],
    }),

    unsubscribe: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `channels/${id}/subscriptions`,
        method: 'delete',
      }),
      invalidatesTags: ['Subscription'],
    }),
  }),
});

export const {
  useGetChannelQuery,
  useGetSubscribesQuery,
  useGetSubscribersQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} = channelApi;
export const {
  getChannel,
  getSubscribes,
  getSubscribers,
  subscribe,
  unsubscribe,
} = channelApi.endpoints;
