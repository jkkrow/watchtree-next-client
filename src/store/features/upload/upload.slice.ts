import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UploadSliceState } from './upload.type';

const initialState: UploadSliceState = {
  sourceTree: null,
  renderTree: null,
  activeNodeId: '',
  isUploadSaved: false,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    initiateUpload() {},
    completeUpload() {},
    saveUpload() {},
    createNode(state, { payload }: PayloadAction<{ parentId: string }>) {},
    updateNode() {},
    removeNode() {},
    updateTree() {},
    setActiveNode() {},
  },
});

export const {
  initiateUpload,
  completeUpload,
  saveUpload,
  createNode,
  updateNode,
  removeNode,
  updateTree,
  setActiveNode,
} = uploadSlice.actions;
