import { AppState } from '@/store';
import { appApi, axiosBaseQuery } from '@/store/app/api';
import { MessageResponse } from '@/store/common/api.type';
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
      query: () => ({ url: 'users/current' }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setInfo(data.user));
      },
      providesTags: ['User', { type: 'User', id: 'INFO' }],
    }),

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

    updateName: builder.mutation<MessageResponse, string>({
      query: (name) => ({
        url: 'users/current/name',
        method: 'patch',
        data: { name },
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    updatePassword: builder.mutation<MessageResponse, UpdatePasswordRequest>({
      query: (data) => ({
        url: 'users/current/password',
        method: 'patch',
        data,
      }),
    }),

    updatePicture: builder.mutation<MessageResponse, File>({
      queryFn: async (file, api, extraOptions, baseQuery) => {
        const { info } = (api.getState() as AppState).user;
        const { data, error } = await baseQuery({
          url: 'upload/images',
          data: { fileType: file.type, key: info?.picture },
          method: 'put',
        });

        if (error) return { error };
        const uploadQuery = axiosBaseQuery();
        const { presignedUrl, key } = data as Record<string, string>;
        const { error: uploadError } = await uploadQuery(
          {
            url: presignedUrl,
            method: 'put',
            headers: { 'Content-Type': file.type },
            data: file,
          },
          api,
          extraOptions
        );

        if (uploadError) return { error: uploadError };
        return baseQuery({
          url: 'users/current/picture',
          method: 'patch',
          data: { picture: key },
        }) as { data: MessageResponse };
      },
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    deletePicture: builder.mutation<MessageResponse, void>({
      queryFn: async (_, api, __, baseQuery) => {
        const { info } = (api.getState() as AppState).user;
        const { error } = await baseQuery({
          url: `upload/images/${info?.picture}`,
          method: 'delete',
        });

        if (error) return { error };
        return baseQuery({
          url: 'users/current/picture',
          method: 'patch',
          data: { picture: '' },
        }) as { data: MessageResponse };
      },
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    createMembership: builder.mutation<MessageResponse, string>({
      query: (subscriptionId) => ({
        url: 'users/current/membership',
        method: 'post',
        data: { subscriptionId },
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    cancelMembership: builder.mutation<MessageResponse, string | void>({
      query: (reason) => ({
        url: 'users/current/membership/cancel',
        method: 'post',
        data: { reason },
      }),
      invalidatesTags: [{ type: 'User', id: 'INFO' }],
    }),

    deleteAccount: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: (data) => ({
        url: 'users/current/deletion',
        method: 'post',
        data,
      }),
    }),

    deleteGoogleAccount: builder.mutation<MessageResponse, string>({
      query: (token) => ({
        url: 'users/current/deletion-google',
        method: 'post',
        data: { token },
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
