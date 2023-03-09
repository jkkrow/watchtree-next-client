import { appApi } from '@/store/app/api';
import { MessageResponse } from '@/store/common/api.type';
import { setCredentials, clearUser } from '../user/user.slice';
import {
  SignupRequest,
  SigninRequest,
  SigninResponse,
  ResetPasswordRequest,
} from './auth.type';

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SigninResponse, SignupRequest>({
      query: (data) => ({
        url: 'users/signup',
        method: 'post',
        data,
        withCredentials: true,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const { accessToken, refreshTokenExp } = data;
        dispatch(setCredentials({ accessToken, refreshTokenExp }));
      },
      invalidatesTags: ['User'],
    }),

    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (data) => ({
        url: 'users/signin',
        method: 'post',
        data,
        withCredentials: true,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const { accessToken, refreshTokenExp } = data;
        dispatch(setCredentials({ accessToken, refreshTokenExp }));
      },
      invalidatesTags: ['User'],
    }),

    signinGoogle: builder.mutation<SigninResponse, string>({
      query: (token) => ({
        url: 'users/signin-google',
        method: 'post',
        data: { token },
        withCredentials: true,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const { accessToken, refreshTokenExp } = data;
        dispatch(setCredentials({ accessToken, refreshTokenExp }));
      },
      invalidatesTags: ['User'],
    }),

    signout: builder.mutation<void, void>({
      query: () => ({
        url: 'users/signout',
        method: 'post',
        withCredentials: true,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(clearUser());
        await queryFulfilled;
      },
      extraOptions: { ignoreMessage: true },
      invalidatesTags: ['User'],
    }),

    sendVerification: builder.mutation<MessageResponse, string>({
      query: (email) => ({
        url: 'users/verification',
        method: 'post',
        data: { email },
      }),
    }),

    checkVerification: builder.mutation<MessageResponse, string>({
      query: (token) => ({
        url: `users/verification/${token}`,
        method: 'post',
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    sendRecovery: builder.mutation<MessageResponse, string>({
      query: (email) => ({
        url: 'users/recovery',
        method: 'post',
        data: { email },
      }),
    }),

    checkRecovery: builder.mutation<MessageResponse, string>({
      query: (token) => ({
        url: `users/recovery/${token}`,
        method: 'post',
      }),
    }),

    resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
      query: ({ token, password, confirmPassword }) => ({
        url: `users/recovery/${token}/password`,
        method: 'patch',
        data: { password, confirmPassword },
      }),
    }),
  }),
});

export const {
  signup,
  signin,
  signinGoogle,
  signout,
  sendVerification,
  checkVerification,
  sendRecovery,
  checkRecovery,
  resetPassword,
} = authApi.endpoints;

export const {
  useSignupMutation,
  useSigninMutation,
  useSigninGoogleMutation,
  useSignoutMutation,
  useSendVerificationMutation,
  useCheckVerificationMutation,
  useSendRecoveryMutation,
  useCheckRecoveryMutation,
  useResetPasswordMutation,
} = authApi;
