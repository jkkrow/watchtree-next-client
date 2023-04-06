import { VideoTree, VideoNode } from '../video/video.type';

export interface UploadSliceState {
  uploadTree: VideoTree | null;
  activeNodeId: string;
  files: UploadFile[];
  progresses: UploadProgress[];
  errors: UploadError[];
  saved: boolean;
}

export interface UploadFile {
  fileName: string;
  url: string;
}

export interface UploadProgress {
  fileName: string;
  percentage: number;
  rate?: number;
  uploadId?: string;
}

export interface UploadError {
  nodeId: string;
  message: string;
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

export interface CancelUploadRequest {
  fileName: string;
  uploadId?: string;
}
