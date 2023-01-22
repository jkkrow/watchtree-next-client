import { videoSlice } from './video.slice';

export const {
  setVideoTree,
  setActiveNode,
  setInitialProgress,
  setCurrentProgress,
  setVolume,
  setResolution,
  setPlaybackRate,
} = videoSlice.actions;
