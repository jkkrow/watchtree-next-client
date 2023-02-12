import { AppState } from '@/store';
import { appApi, axiosBaseQuery } from '@/store/app/api';
import { MessageResponse } from '@/store/common/common.type';
import {
  setupUpload,
  createNode,
  deleteNode,
  updateNode,
  setSaved,
  setProgress,
  clearProgress,
} from './upload.slice';
import {
  InitiateUploadResponse,
  AppendNodeRequest,
  AppendNodeResponse,
  DiscardNodeRequest,
  UploadVideoRequest,
} from './upload.type';
import {
  findDuplicate,
  getVideoDuration,
  uploadProgressHandler,
} from './upload.util';

export const uploadApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateUpload: builder.mutation<InitiateUploadResponse, void>({
      query: () => ({ url: 'video-trees', method: 'post' }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setupUpload(data.videoTree));
      },
    }),

    continueUpload: builder.mutation<InitiateUploadResponse, string>({
      query: (id) => ({ url: `channels/current/video-trees/${id}` }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setupUpload(data.videoTree));
      },
    }),

    appendNode: builder.mutation<AppendNodeResponse, AppendNodeRequest>({
      query: ({ id, parentId }) => ({
        url: `video-trees/${id}/video-nodes`,
        method: 'post',
        data: { parentId },
      }),
      onQueryStarted: async ({ parentId }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(createNode({ parentId, node: data.videoNode }));
        dispatch(setSaved(true));
      },
    }),

    discardNode: builder.mutation<MessageResponse, DiscardNodeRequest>({
      query: ({ id, nodeId }) => ({
        url: `video-trees/${id}/video-nodes/${nodeId}`,
        method: 'delete',
      }),
      onQueryStarted: async ({ nodeId }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(deleteNode(nodeId));
        dispatch(setSaved(true));
      },
    }),

    uploadVideo: builder.mutation<MessageResponse, UploadVideoRequest>({
      queryFn: async ({ nodeId, file }, api, extraOptions, baseQuery) => {
        const { dispatch, getState } = api;
        const { uploadTree } = (getState() as AppState).upload;

        if (!uploadTree || typeof window === 'undefined') {
          const error = { status: 400, data: { message: 'Invalid request' } };
          return { error };
        }

        const id = uploadTree.id;
        const name = file.name;
        const duration = await getVideoDuration(file);

        const info = {
          name,
          size: file.size,
          label: `Select ${name}`,
          url: URL.createObjectURL(file),
          duration,
          selectionTimeStart: +(duration - 10 || 0).toFixed(3),
          selectionTimeEnd: +duration.toFixed(3),
        };

        dispatch(updateNode({ id: nodeId, info }));

        // Check if file is duplicated
        // Case 1: upload not finished
        // Case 2: upload finished and node has blob url
        // Case 3: upload finished and node has valid url
        const duplicate = findDuplicate(uploadTree.root, name);
        if (duplicate) {
          return baseQuery({
            url: `video-trees/${id}/video-nodes/${nodeId}`,
            method: 'patch',
            data: { ...info, url: duplicate.url },
          }) as { data: MessageResponse };
        }

        // Upload video
        const { data: initData, error: initError } = await baseQuery({
          url: 'upload/multipart',
          method: 'post',
          data: { videoId: id, fileName: name, fileType: file.type },
        });

        if (initError) return { error: initError };
        const { uploadId } = initData as { uploadId: string };
        const partSize = 10 * 1024 * 1024;
        const partCount = Math.floor(file.size / partSize) + 1;

        const { data: processData, error: processError } = await baseQuery({
          url: `upload/multipart/${uploadId}`,
          method: 'put',
          data: { videoId: id, fileName: name, partCount },
        });

        if (processError) return { error: processError };
        const uploadQuery = axiosBaseQuery();
        const { presignedUrls } = processData as { presignedUrls: string[] };

        const uploadPartPromises = presignedUrls.map((presignedUrl, index) => {
          const partNumber = index + 1;
          const from = index * partSize;
          const to = partNumber < partCount ? partNumber * partSize : undefined;
          const blob = file.slice(from, to);
          return uploadQuery(
            {
              url: presignedUrl,
              method: 'PUT',
              headers: { 'Content-Type': file.type },
              data: blob,
              onUploadProgress: uploadProgressHandler(
                partNumber,
                partCount,
                (percentage, rate) => {
                  dispatch(setProgress({ fileName: name, percentage, rate }));
                }
              ),
            },
            api,
            extraOptions
          );
        });

        const uploadResponses = await Promise.all(uploadPartPromises);
        const uploadParts = uploadResponses.map((response: any, index) => ({
          Etag: response.meta?.response?.headers?.etag,
          PartNumber: index + 1,
        }));

        const { data: completeData, error: completeError } = await baseQuery({
          url: `upload/multipart/${uploadId}`,
          method: 'post',
          data: { videoId: id, fileName: name, parts: uploadParts },
        });

        if (completeError) return { error: completeError };
        const { url } = completeData as { url: string };
        return baseQuery({
          url: `video-trees/${id}/video-nodes/${nodeId}`,
          method: 'patch',
          data: { ...info, url },
        }) as { data: MessageResponse };
      },
      onQueryStarted: async ({ file }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(clearProgress(file.name));
        dispatch(setSaved(true));
      },
    }),

    // uploadThumbnail: builder.mutation({
    //   queryFn: () => {},
    // }),

    // saveUpload: builder.mutation({
    //   queryFn: () => {},
    //   invalidatesTags: (_, __, { id }) => [{ type: 'Video', id }],
    // }),

    // completeUpload: builder.mutation({
    //   queryFn: () => {},
    //   invalidatesTags: (_, __, { id }) => ['Video'],
    // }),

    deleteUpload: builder.mutation<MessageResponse, string>({
      query: (id) => ({ url: `video-trees/${id}`, method: 'delete' }),
      invalidatesTags: (_, __, id) => [
        { type: 'Video', id },
        { type: 'Video', id: 'LIST' },
      ],
      // onQueryStarted: () => {},
    }),
  }),
});

export const { ...rest } = uploadApi;
