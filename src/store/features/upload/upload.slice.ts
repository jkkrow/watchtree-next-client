import { createSlice } from '@reduxjs/toolkit';

interface UploadSliceState {
  sourceTree: null;
  renderTree: null;
  activeNodeId: string;
  isUploadSaved: boolean;
}

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
    createNode() {},
    updateNode() {},
    removeNode() {},
    updateTree() {},
    setActiveNode() {},
  },
});
