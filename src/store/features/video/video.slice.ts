import { createSlice } from '@reduxjs/toolkit';

import { VideoSliceState } from './video.type';

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
    setVideoTree() {},
    setActiveNode(state, { payload }) {
      state.activeNodeId = payload;
    },
    setInitialProgress() {},
    setCurrentProgress() {},
    setVolume(state, { payload }) {
      state.volume = payload;
    },
    setResolution() {},
    setPlaybackRate() {},
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
} = videoSlice.actions;
