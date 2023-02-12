import { VideoTree, VideoNode } from '../video/video.type';

export interface UploadSliceState {
  uploadTree: VideoTree | null;
  activeNodeId: string;
  progresses: UploadProgress[];
  errors: UploadError[];
  saved: boolean;
}

export interface UploadError {
  nodeId: string;
  message: string;
}

export interface UploadProgress {
  fileName: string;
  percentage: number;
  rate: number;
}

export interface InitiateUploadResponse {
  videoTree: VideoTree;
}

export interface AppendNodeRequest {
  id: string;
  parentId: string;
}

export interface AppendNodeResponse {
  videoNode: VideoNode;
}

export interface DiscardNodeRequest {
  id: string;
  nodeId: string;
}

export interface DeleteNodeRequest {
  id: string;
  nodeId: string;
}

export interface UploadVideoRequest {
  nodeId: string;
  file: File;
}
