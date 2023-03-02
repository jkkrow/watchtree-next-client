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
}

export interface LocalHistory extends History {
  videoId: string;
  updatedAt: string;
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
  extends KeysetPaginationResponse<VideoTreeEntryWithData | null> {}
