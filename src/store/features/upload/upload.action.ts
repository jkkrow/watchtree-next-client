import { uploadSlice } from './upload.slice';

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
