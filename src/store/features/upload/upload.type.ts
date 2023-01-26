import { VideoTree } from '../video/video.type';

export interface UploadSliceState {
  sourceTree: null;
  renderTree: null;
  activeNodeId: string;
  isUploadSaved: boolean;
}

export interface SourceTree extends VideoTree {}

export interface RenderTree extends VideoTree {}
