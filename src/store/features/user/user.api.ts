import { appApi } from '@/store/app/api';

export const userApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.query({
      query: (id: string) => ({ url: `users/${id}` }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
      },
    }),
  }),
});

export const { useSigninQuery } = userApi;
