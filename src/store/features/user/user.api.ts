import { AppState } from '@/store';
import { appApi, axiosBaseQuery } from '@/store/app/api';
import { MessageResponse } from '@/store/common/api.type';
import { setInfo } from './user.slice';
import { GetUserRequest, UpdatePasswordRequest } from './user.type';

export const userApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserRequest, void>({
      query: () => ({ url: 'users/current' }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setInfo(data.user));
      },
      providesTags: ['User', { type: 'User', id: 'INFO' }],
      extraOptions: { ignoreMessage: true },
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
          url: `upload/images`,
          method: 'delete',
          params: { key: info?.picture },
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

    deleteAccount: builder.mutation<MessageResponse, string>({
      query: (password) => ({
        url: 'users/current/deletion',
        method: 'post',
        data: { password },
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
  updateName,
  updatePassword,
  updatePicture,
  deletePicture,
  createMembership,
  cancelMembership,
  deleteAccount,
  deleteGoogleAccount,
} = userApi.endpoints;

export const {
  useGetUserQuery,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
  useUpdatePictureMutation,
  useDeletePictureMutation,
  useCreateMembershipMutation,
  useCancelMembershipMutation,
  useDeleteAccountMutation,
  useDeleteGoogleAccountMutation,
} = userApi;
