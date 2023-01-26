export interface VideoSliceState {
  videoTree: null;
  activeNodeId: string;
  initialProgress: number;
  currentProgress: number;
  volume: number;
  resolution: number | 'auto';
  playbackRate: number;
}

export interface VideoTree {
  url: string;
}

export interface GetVideosResult {
  videoTrees: VideoTree[];
  count: number;
}
