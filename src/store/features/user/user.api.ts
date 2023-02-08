import { appApi } from '@/store/app/api';
import { MessageResponse } from '@/store/common/common.type';
import { setInfo, setCredentials, clearUser } from './user.slice';
import {
  GetUserRequest,
  SignupRequest,
  SigninRequest,
  SigninResponse,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  DeleteUserRequest,
} from './user.type';

export const userApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserRequest, void>({
      query: () => ({
        url: 'users/current',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setInfo(data.user));
      },
      providesTags: ['User', { type: 'User', id: 'INFO' }],
    }),

    signup: builder.mutation<SigninResponse, SignupRequest>({
      query: (body) => ({
        url: 'users/signup',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const { accessToken, refreshTokenExp } = data;
        dispatch(setCredentials({ accessToken, refreshTokenExp }));
      },
      invalidatesTags: ['User'],
    }),

    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (body) => ({
        url: 'users/signin',
        method: 'POST',
        body,
        credentials: 'include',
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
        method: 'POST',
        body: { token },
        credentials: 'include',
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
        method: 'POST',
        credentials: 'include',
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
        method: 'POST',
        body: { email },
      }),
    }),

    checkVerification: builder.mutation<MessageResponse, string>({
      query: (token) => ({
        url: `users/verification/${token}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    sendRecovery: builder.mutation<MessageResponse, string>({
      query: (email) => ({
        url: 'users/recovery',
        method: 'POST',
        body: { email },
      }),
    }),

    checkRecovery: builder.mutation<MessageResponse, string>({
      query: (token) => ({
        url: `users/recovery/${token}`,
        method: 'POST',
      }),
    }),

    resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
      query: ({ token, password, confirmPassword }) => ({
        url: `users/recovery/${token}/password`,
        method: 'PATCH',
        body: { password, confirmPassword },
      }),
    }),

    updateName: builder.mutation<MessageResponse, string>({
      query: (name) => ({
        url: 'users/current/name',
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    updatePassword: builder.mutation<MessageResponse, UpdatePasswordRequest>({
      query: (body) => ({
        url: 'users/current/password',
        method: 'PATCH',
        body,
      }),
    }),

    updatePicture: builder.mutation<MessageResponse, string>({
      query: (picture) => ({
        url: 'users/current/picture',
        method: 'PATCH',
        body: { picture },
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    createMembership: builder.mutation<MessageResponse, string>({
      query: (subscriptionId) => ({
        url: 'users/current/membership',
        method: 'POST',
        body: { subscriptionId },
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    cancelMembership: builder.mutation<MessageResponse, string | void>({
      query: (reason) => ({
        url: 'users/current/membership/cancel',
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    deleteAccount: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: (body) => ({
        url: 'users/current/deletion',
        method: 'POST',
        body,
      }),
    }),

    deleteGoogleAccount: builder.mutation<MessageResponse, string>({
      query: (token) => ({
        url: 'users/current/deletion-google',
        method: 'POST',
        body: { token },
      }),
    }),
  }),
});

export const {
  getUser,
  signup,
  signin,
  signinGoogle,
  signout,
  sendVerification,
  checkVerification,
  sendRecovery,
  checkRecovery,
  resetPassword,
  updateName,
  updatePassword,
  updatePicture,
  createMembership,
  cancelMembership,
  deleteAccount,
  deleteGoogleAccount,
} = userApi.endpoints;

export const {
  useGetUserQuery,
  useSignupMutation,
  useSigninMutation,
  useSigninGoogleMutation,
  useSignoutMutation,
  useSendVerificationMutation,
  useCheckVerificationMutation,
  useSendRecoveryMutation,
  useCheckRecoveryMutation,
  useResetPasswordMutation,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
  useUpdatePictureMutation,
  useCreateMembershipMutation,
  useCancelMembershipMutation,
  useDeleteAccountMutation,
  useDeleteGoogleAccountMutation,
} = userApi;
