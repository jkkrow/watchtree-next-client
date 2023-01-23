import { appApi } from '@/store/app/api';

export const channelApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannel: builder.query({
      query: ({ id }: { id: string }) => ({ url: `channels/${id}` }),
    }),
  }),
});

export const { useGetChannelQuery } = channelApi;
export const { getChannel } = channelApi.endpoints;
