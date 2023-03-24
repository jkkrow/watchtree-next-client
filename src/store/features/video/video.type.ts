import {
  OffsetPaginationRequest,
  OffsetPaginationResponse,
  KeysetPaginationRequest,
  KeysetPaginationResponse,
} from '@/store/common/api.type';
import { History } from '../history/history.type';

export interface VideoSliceState {
  videoTree: VideoTree | null;
  activeNodeId: string;
  initialProgress: number;
  currentProgress: number;
  volume: number;
  resolution: number | 'auto';
  playbackRate: number;
}

export interface VideoTree extends VideoTreeEntry {
  description: string;
  root: VideoNode;
}

export interface VideoTreeWithData extends VideoTreeEntryWithData {
  description: string;
  root: VideoNode;
}

export interface VideoTreeEntry {
  id: string;
  title: string;
  categories: string[];
  thumbnail: string;
  size: number;
  maxDuration: number;
  minDuration: number;
  status: VideoTreeStatus;
  editing: boolean;
  creatorId: string;
  createdAt: DateString;
  updatedAt: DateString;
}

export interface VideoTreeEntryWithData extends VideoTreeEntry {
  views: number;
  favorites: number;
  favorited: boolean;
  creator: VideoTreeCreator;
  history: History | null;
}

export interface VideoNode {
  id: string;
  name: string;
  url: string;
  label: string;
  level: number;
  size: number;
  duration: number;
  selectionTimeStart: number;
  selectionTimeEnd: number;
  children: VideoNode[];
}

export interface VideoTreeCreator {
  id: string;
  name: string;
  picture: string;
}

export interface DeletedVideoTree {
  id: string;
  data: null;
}

export type VideoTreeStatus = 'public' | 'private';

export interface GetVideosRequest extends KeysetPaginationRequest {}

export interface SearchVideosRequest extends OffsetPaginationRequest {
  keyword: string;
}

export interface GetCreatedVideosRequest extends OffsetPaginationRequest {}

export interface GetFavoritesRequest extends OffsetPaginationRequest {}

export interface GetVideoResponse {
  videoTree: VideoTreeWithData;
}

export interface GetVideosResponse
  extends KeysetPaginationResponse<VideoTreeEntryWithData> {}

export interface SearchVideosResponse
  extends OffsetPaginationResponse<VideoTreeEntryWithData> {}

export interface GetCreatedVideosResponse
  extends OffsetPaginationResponse<VideoTreeEntryWithData> {}

export interface GetFavoritesResponse
  extends OffsetPaginationResponse<VideoTreeEntryWithData> {}
