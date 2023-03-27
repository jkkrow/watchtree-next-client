import {
  KeysetPaginationRequest,
  KeysetPaginationResponse,
} from '@/store/common/api.type';
import { VideoTreeEntryWithData } from '../video/video.type';

export interface History {
  activeNodeId: string;
  progress: number;
  totalProgress: number;
  ended: boolean;
  watchedAt: string;
}

export interface LocalHistory extends History {
  videoId: string;
}

export interface GetHistoriesRequest extends KeysetPaginationRequest {
  skipEnded?: boolean;
}

export interface SaveHistoryRequest {
  videoId: string;
  activeNodeId: string;
  progress: number;
  totalProgress: number;
  ended: boolean;
}

export interface GetHistoriesResponse
  extends KeysetPaginationResponse<VideoTreeEntryWithData> {}
