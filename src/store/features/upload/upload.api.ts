import { AppBaseQueryError, AppState } from '@/store';
import { appApi, axiosBaseQuery } from '@/store/app/api';
import { MessageResponse } from '@/store/common/api.type';
import {
  setupUpload,
  createNode,
  deleteNode,
  updateNode,
  setSaved,
  setProgress,
  clearProgress,
  updateTree,
  clearUpload,
  setFile,
} from './upload.slice';
import {
  InitiateUploadResponse,
  AppendNodeRequest,
  AppendNodeResponse,
  DiscardNodeRequest,
  UploadVideoRequest,
  CancelUploadRequest,
} from './upload.type';
import {
  findDuplicate,
  getVideoDuration,
  uploadProgressHandler,
  startRequest,
  abortRequest,
  completeRequest,
} from './upload.util';
import { traverseNodes } from '../video/video.util';

export const uploadApi = appApi.injectEndpoints({
  overrideExisting: true,
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
        const { uploadTree, files } = (getState() as AppState).upload;

        if (!uploadTree || typeof window === 'undefined') {
          const error = { status: 400, data: { message: 'Invalid request' } };
          return { error } as { error: AppBaseQueryError };
        }

        const id = uploadTree.id;
        const fileName = file.name;
        const fileType = file.type;
        const duration = await getVideoDuration(file);

        const info = {
          name: fileName,
          size: file.size,
          label: `Select ${fileName}`,
          url: URL.createObjectURL(file),
          duration: Math.ceil(duration * 1000) / 1000,
          selectionTimeStart: +(duration - 10 || 0).toFixed(3),
          selectionTimeEnd: +duration.toFixed(3),
        };

        dispatch(updateNode({ id: nodeId, info }));

        // Check if file is duplicated
        // Case 1: upload not finished
        // Case 2: upload finished and node has blob url
        // Case 3: upload finished and node has valid url
        const duplicate = findDuplicate(uploadTree.root, fileName);
        if (duplicate) {
          const uploaded = files.find((item) => item.fileName === fileName);
          if (!uploaded) return { data: { message: '' } };

          const { data: updateData, error: updateError } = await baseQuery({
            url: `video-trees/${id}/video-nodes/${nodeId}`,
            method: 'patch',
            data: { ...info, url: uploaded.url },
          });

          if (updateError) return { error: updateError };
          dispatch(setSaved(true));
          return { data: updateData } as { data: MessageResponse };
        }

        // Upload video
        dispatch(setProgress({ fileName, percentage: 0 }));
        const abortSignal = startRequest(fileName);
        const { data: initData, error: initError } = await baseQuery({
          url: 'upload/multipart',
          method: 'post',
          signal: abortSignal,
          data: { videoId: id, fileName, fileType },
        });

        if (initError) return { error: initError };
        const { uploadId } = initData as { uploadId: string };
        const partSize = 10 * 1024 * 1024;
        const partCount = Math.floor(file.size / partSize) + 1;

        const { data: processData, error: processError } = await baseQuery({
          url: `upload/multipart/${uploadId}`,
          method: 'put',
          signal: abortSignal,
          data: { videoId: id, fileName, partCount, fileType },
        });

        if (processError) return { error: processError };
        const uploadQuery = axiosBaseQuery();
        const { presignedUrls } = processData as { presignedUrls: string[] };

        const progressArray: number[] = [];
        const uploadPartPromises = presignedUrls.map((presignedUrl, index) => {
          const partNumber = index + 1;
          const from = index * partSize;
          const to = partNumber < partCount ? partNumber * partSize : undefined;
          const blob = file.slice(from, to);
          const callback = (percentage: number, rate?: number) => {
            dispatch(setProgress({ fileName, percentage, rate, uploadId }));
          };
          return uploadQuery(
            {
              url: presignedUrl,
              method: 'put',
              headers: { 'Content-Type': fileType },
              signal: abortSignal,
              data: blob,
              onUploadProgress: uploadProgressHandler(
                progressArray,
                partNumber,
                partCount,
                callback
              ),
            },
            api,
            extraOptions
          );
        });

        const uploadResponses = await Promise.all(uploadPartPromises);

        for (const uploadResponse of uploadResponses) {
          if (uploadResponse.error) return { error: uploadResponse.error };
        }

        const uploadParts = uploadResponses.map((response, index) => ({
          ETag: response.meta?.headers.etag,
          PartNumber: index + 1,
        }));

        const { data: completeData, error: completeError } = await baseQuery({
          url: `upload/multipart/${uploadId}`,
          method: 'post',
          signal: abortSignal,
          data: { videoId: id, fileName: fileName, parts: uploadParts },
        });

        if (completeError) return { error: completeError };
        const { url } = completeData as { url: string };

        const updatedTree = (getState() as AppState).upload.uploadTree!;
        const nodes = traverseNodes(updatedTree.root);
        const matchingNodes = nodes.filter((node) => node.name === fileName);

        const updateNodesPromise = matchingNodes.map((node) =>
          baseQuery({
            url: `video-trees/${id}/video-nodes/${node.id}`,
            method: 'patch',
            signal: abortSignal,
            data: { ...node, url },
          })
        );

        const updateResponses = await Promise.all(updateNodesPromise);

        for (const updateResponse of updateResponses) {
          if (updateResponse.error) return { error: updateResponse.error };
        }

        completeRequest(fileName);
        dispatch(setFile({ fileName, url }));
        dispatch(clearProgress(file.name));
        dispatch(setSaved(true));
        return updateResponses[0] as { data: MessageResponse };
      },
    }),

    cancelUpload: builder.mutation<MessageResponse, CancelUploadRequest>({
      queryFn: async ({ fileName, uploadId }, api, _, baseQuery) => {
        const { uploadTree } = (api.getState() as AppState).upload;

        if (!uploadTree || typeof window === 'undefined') {
          const error = { status: 400, data: { message: 'Invalid request' } };
          return { error } as { error: AppBaseQueryError };
        }

        abortRequest(fileName);
        if (uploadId) {
          return baseQuery({
            url: `upload/multipart/${uploadId}`,
            method: 'delete',
            params: { videoId: uploadTree.id, fileName },
          }) as { data: MessageResponse };
        }

        return { data: { message: 'Video upload cancelled successfully' } };
      },
      onQueryStarted: async (
        { fileName },
        { dispatch, getState, queryFulfilled }
      ) => {
        await queryFulfilled;
        const uploadTree = (getState() as AppState).upload.uploadTree!;
        const nodes = traverseNodes(uploadTree.root);
        const matchingNodes = nodes.filter((node) => node.name === fileName);
        const updates = {
          name: '',
          size: 0,
          label: '',
          url: '',
          duration: 0,
          selectionTimeStart: 0,
          selectionTimeEnd: 0,
        };

        for (const node of matchingNodes) {
          dispatch(updateNode({ id: node.id, info: updates }));
        }

        dispatch(clearProgress(fileName));
        dispatch(setSaved(true));
      },
    }),

    uploadThumbnail: builder.mutation<MessageResponse, File>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const { dispatch, getState } = api;
        const { uploadTree } = (getState() as AppState).upload;

        if (!uploadTree) return { error: { status: 400 } };
        const { data: urlData, error: urlError } = await baseQuery({
          url: 'upload/images',
          method: 'put',
          data: { key: uploadTree.thumbnail, fileType: arg.type },
        });

        if (urlError) return { error: urlError };
        const uploadQuery = axiosBaseQuery();
        const { presignedUrl, key } = urlData as {
          presignedUrl: string;
          key: string;
        };

        const { error: uploadError } = await uploadQuery(
          {
            url: presignedUrl,
            method: 'put',
            headers: { 'Content-Type': arg.type },
            data: arg,
          },
          api,
          extraOptions
        );

        if (uploadError) return { error: uploadError };
        dispatch(updateTree({ thumbnail: key }));
        const updatedTree = (getState() as AppState).upload.uploadTree!;

        return baseQuery({
          url: `video-trees/${uploadTree.id}`,
          method: 'patch',
          data: updatedTree,
        }) as { data: MessageResponse };
      },
      invalidatesTags: ['Video'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(setSaved(true));
      },
    }),

    deleteThumbnail: builder.mutation<MessageResponse, void>({
      queryFn: async (_, api, __, baseQuery) => {
        const { dispatch, getState } = api;
        const { uploadTree } = (getState() as AppState).upload;

        if (!uploadTree) return { error: { status: 400 } };
        const { error: deleteError } = await baseQuery({
          url: 'upload/images',
          method: 'delete',
          params: { key: uploadTree.thumbnail },
        });

        if (deleteError) return { error: deleteError };
        dispatch(updateTree({ thumbnail: '' }));
        const updatedTree = (getState() as AppState).upload.uploadTree!;

        return baseQuery({
          url: `video-trees/${uploadTree.id}`,
          method: 'patch',
          data: updatedTree,
        }) as { data: MessageResponse };
      },
      invalidatesTags: ['Video'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(setSaved(true));
      },
    }),

    saveUpload: builder.mutation<MessageResponse, void>({
      queryFn: (_, api, __, baseQuery) => {
        const { getState } = api;
        const { uploadTree } = (getState() as AppState).upload;

        if (!uploadTree) return { error: { status: 400 } };
        return baseQuery({
          url: `video-trees/${uploadTree.id}`,
          method: 'patch',
          data: uploadTree,
        }) as { data: MessageResponse };
      },
      invalidatesTags: ['Video'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(setSaved(true));
      },
    }),

    completeUpload: builder.mutation<MessageResponse, void>({
      queryFn: (_, api, __, baseQuery) => {
        const { getState } = api;
        const { uploadTree } = (getState() as AppState).upload;

        if (!uploadTree) return { error: { status: 400 } };
        return baseQuery({
          url: `video-trees/${uploadTree.id}`,
          method: 'patch',
          data: { ...uploadTree, editing: false },
        }) as { data: MessageResponse };
      },
      invalidatesTags: ['Video'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(clearUpload());
      },
    }),

    deleteUpload: builder.mutation<MessageResponse, string>({
      query: (id) => ({ url: `video-trees/${id}`, method: 'delete' }),
      invalidatesTags: (_, __, id) => [
        { type: 'Video', id },
        { type: 'Video', id: 'LIST' },
      ],
      onQueryStarted: async (id, { dispatch, getState, queryFulfilled }) => {
        await queryFulfilled;
        const { uploadTree } = (getState() as AppState).upload;
        if (!uploadTree || id !== uploadTree.id) return;
        dispatch(clearUpload());
      },
    }),
  }),
});

export const {
  useInitiateUploadMutation,
  useContinueUploadMutation,
  useAppendNodeMutation,
  useDiscardNodeMutation,
  useUploadVideoMutation,
  useCancelUploadMutation,
  useUploadThumbnailMutation,
  useDeleteThumbnailMutation,
  useSaveUploadMutation,
  useCompleteUploadMutation,
  useDeleteUploadMutation,
} = uploadApi;

export const {
  initiateUpload,
  continueUpload,
  appendNode,
  discardNode,
  uploadVideo,
  cancelUpload,
  uploadThumbnail,
  deleteThumbnail,
  saveUpload,
  completeUpload,
  deleteUpload,
} = uploadApi.endpoints;
