import {
  OffsetPaginationRequest,
  KeysetPaginationRequest,
  OffsetPaginationResponse,
  KeysetPaginationResponse,
} from '@/store/common/common.type';
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
  categories: VideoTreeCategory[];
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

export interface VideoTreeCategory {
  name: string;
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

export interface GetVideoResponse {
  videoTree: VideoTreeWithData;
}

export interface GetVideosRequest extends KeysetPaginationRequest {}

export interface GetVideosResponse extends KeysetPaginationResponse {
  videoTrees: VideoTreeEntryWithData[];
}

export interface SearchVideosRequest extends OffsetPaginationRequest {
  keyword: string;
}

export interface SearchVideosResponse extends OffsetPaginationResponse {
  videoTrees: VideoTreeEntryWithData[];
}

export interface GetCreatedVideosResponse extends OffsetPaginationResponse {
  videoTrees: VideoTreeEntry[];
}

export type VideoTreeStatus = 'public' | 'private';
