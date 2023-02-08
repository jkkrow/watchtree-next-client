import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { VideoSliceState, VideoTree } from './video.type';

const initialState: VideoSliceState = {
  videoTree: null,
  activeNodeId: '',
  initialProgress: 0,
  currentProgress: 0,
  volume: 1,
  resolution: 'auto',
  playbackRate: 1,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoTree(state, { payload }: PayloadAction<VideoTree>) {
      state.videoTree = payload;
    },
    setActiveNode(state, { payload }: PayloadAction<string>) {
      state.activeNodeId = payload;
    },
    setInitialProgress(state, { payload }: PayloadAction<number>) {
      state.initialProgress = payload;
    },
    setCurrentProgress(state, { payload }: PayloadAction<number>) {
      state.currentProgress = payload;
    },
    setVolume(state, { payload }: PayloadAction<number>) {
      state.volume = payload;
    },
    setResolution(state, { payload }: PayloadAction<number | 'auto'>) {
      state.resolution = payload;
    },
    setPlaybackRate(state, { payload }: PayloadAction<number>) {
      state.playbackRate = payload;
    },
    clearVideoTree(state) {
      state.videoTree = null;
    },
  },
});

export const {
  setVideoTree,
  setActiveNode,
  setInitialProgress,
  setCurrentProgress,
  setVolume,
  setResolution,
  setPlaybackRate,
  clearVideoTree,
} = videoSlice.actions;
