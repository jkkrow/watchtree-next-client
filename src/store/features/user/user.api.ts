import { appApi } from '@/store/app/api';
import { setInfo, setCredentials, clearUser } from './user.slice';
import { User, SigninRequest, SigninResponse } from './user.type';

export const userApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{ user: User }, void>({
      query: () => ({ url: 'users/current' }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setInfo(data.user));
      },
    }),

    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (body: SigninRequest) => ({
        url: 'users/signin',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const { user, accessToken, refreshTokenExp } = data;
        dispatch(setInfo(user));
        dispatch(setCredentials({ accessToken, refreshTokenExp }));
      },
    }),

    signout: builder.mutation<void, void>({
      query: () => ({
        url: 'users/signout',
        method: 'POST',
        credentials: 'include',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(clearUser());
        await queryFulfilled;
      },
      extraOptions: { ignoreMessage: true },
    }),
  }),
});

export const { getUser, signin, signout } = userApi.endpoints;
export const { useGetUserQuery, useSigninMutation, useSignoutMutation } =
  userApi;
