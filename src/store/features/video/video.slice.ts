import { createSlice, current } from '@reduxjs/toolkit';

interface VideoSliceState {
  videoTree: null;
  activeNodeId: string;
  initialProgress: number;
  currentProgress: number;
  volume: number;
  resolution: number | 'auto';
  playbackRate: number;
}

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
