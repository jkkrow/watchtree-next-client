import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';

import { appListener } from '@/store/app/listener';
import { clearUser } from '../user/user.slice';
import {
  findNodeById,
  findNodeByChildId,
  getTotalSize,
  getMinMaxDuration,
} from '../video/video.util';
import { VideoTree, VideoNode } from '../video/video.type';
import { beforeunloadHandler } from './upload.util';
import { UploadSliceState, UploadError, UploadProgress } from './upload.type';

const initialState: UploadSliceState = {
  uploadTree: null,
  activeNodeId: '',
  progresses: [],
  errors: [],
  saved: false,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setupUpload(state, { payload }: PayloadAction<VideoTree>) {
      state.uploadTree = payload;
      state.activeNodeId = payload.root.id;
      state.saved = true;
    },

    clearUpload(state) {
      state.uploadTree = null;
      state.saved = false;
      state.activeNodeId = '';
      state.errors = [];
      state.progresses = [];
    },

    setSaved(state, { payload }: PayloadAction<boolean>) {
      state.saved = payload;
    },

    createNode(
      state,
      { payload }: PayloadAction<{ parentId: string; node: VideoNode }>
    ) {
      if (!state.uploadTree) return;
      const parentNode = findNodeById(state.uploadTree.root, payload.parentId);

      if (!parentNode) return;
      parentNode.children.push(payload.node);
    },

    updateNode(
      state,
      { payload }: PayloadAction<{ id: string; info: Partial<VideoNode> }>
    ) {
      if (!state.uploadTree) return;
      const uploadNode = findNodeById(state.uploadTree.root, payload.id);

      if (!uploadNode) return;
      Object.entries(payload.info).forEach(([key, value]) => {
        const nodeKey = key as keyof VideoNode;
        (uploadNode[nodeKey] as VideoNode[keyof VideoNode]) = value;
      });
    },

    deleteNode(state, { payload }: PayloadAction<string>) {
      if (!state.uploadTree) return;
      const parentNode = findNodeByChildId(state.uploadTree.root, payload);

      if (!parentNode) return;
      parentNode.children = parentNode.children.filter(
        (child) => child.id !== payload
      );
    },

    updateTree(state, { payload }: PayloadAction<Partial<VideoTree>>) {
      if (!state.uploadTree) return;
      const uploadTree = state.uploadTree;

      Object.entries(payload).forEach(([key, value]) => {
        const treeKey = key as keyof VideoTree;
        if (treeKey === 'root') return;
        (uploadTree[treeKey] as VideoTree[keyof VideoTree]) = value;
      });
    },

    setActiveNode(state, { payload }: PayloadAction<string>) {
      state.activeNodeId = payload;
    },

    setError(state, { payload }: PayloadAction<UploadError>) {
      state.errors.push(payload);
    },

    clearError(state, { payload }: PayloadAction<string>) {
      state.errors = state.errors.filter((error) => error.nodeId !== payload);
    },

    setProgress(state, { payload }: PayloadAction<UploadProgress>) {
      const progress = state.progresses.find(
        (progress) => progress.fileName === payload.fileName
      );

      if (!progress) {
        state.progresses.push(payload);
      } else {
        progress.percentage = payload.percentage;
      }
    },

    clearProgress(state, { payload }: PayloadAction<string>) {
      state.progresses = state.progresses.filter(
        (progress) => progress.fileName !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(updateNode, deleteNode, updateTree), (state) => {
      if (!state.uploadTree) return;
      const uploadTree = state.uploadTree;
      const totalSize = getTotalSize(uploadTree.root);
      const { min, max } = getMinMaxDuration(uploadTree.root);

      uploadTree.size = totalSize;
      uploadTree.minDuration = min;
      uploadTree.maxDuration = max;
      state.saved = false;
    });
  },
});

export const {
  setupUpload,
  clearUpload,
  setSaved,
  createNode,
  updateNode,
  deleteNode,
  updateTree,
  setActiveNode,
  setError,
  clearError,
  setProgress,
  clearProgress,
} = uploadSlice.actions;

appListener.startListening({
  actionCreator: clearUser,
  effect: async (_, { dispatch }) => {
    dispatch(clearUpload());
  },
});

appListener.startListening({
  matcher: isAnyOf(setupUpload, clearUpload),
  effect: (action) => {
    if (typeof window === 'undefined') return;
    if (action.type === setupUpload.type) {
      window.addEventListener('beforeunload', beforeunloadHandler);
    } else {
      window.removeEventListener('beforeunload', beforeunloadHandler);
    }
  },
});
