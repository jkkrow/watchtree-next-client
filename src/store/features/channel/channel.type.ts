import {
  KeysetPaginationResponse,
  OffsetPaginationResponse,
} from '@/store/common/api.type';

export interface Channel {
  id: string;
  name: string;
  picture: string;
  videos: number;
  subscribers: number;
  subscribed: boolean;
}

export interface GetChannelResponse {
  channel: Channel;
}

export interface GetSubscribesResponse
  extends KeysetPaginationResponse<Channel> {}

export interface GetSubscribersResponse
  extends OffsetPaginationResponse<Channel> {}
