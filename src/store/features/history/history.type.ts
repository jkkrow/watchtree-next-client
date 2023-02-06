import { PaginationRequest } from '@/store/common/common.type';

export interface History {
  activeNodeId: string;
  progress: number;
  totalProgress: number;
  ended: boolean;
}

export interface LocalHistory extends History {
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetHistoriesRequest extends PaginationRequest {
  ids?: string[];
  skipEnded?: boolean;
}
