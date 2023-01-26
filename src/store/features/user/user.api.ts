import { appApi } from '@/store/app/api';
import { setUser, clearUser } from './user.slice';
import { User } from './user.type';

export const userApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{ user: User }, void>({
      query: () => ({ url: 'users/current' }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setUser({ info: data.user }));
      },
    }),
    signout: builder.mutation<void, void>({
      query: () => ({ url: 'users/signout', method: 'POST' }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(clearUser());
      },
    }),
  }),
});

export const { getUser, signout } = userApi.endpoints;
export const { useGetUserQuery, useSignoutMutation } = userApi;
