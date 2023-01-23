export interface VideoTree {
  url: string;
}

export interface GetVideosResult {
  videoTrees: VideoTree[];
  count: number;
}
