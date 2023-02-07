export interface OffsetPaginationRequest {
  page: number;
  max: number;
}

export interface KeysetPaginationRequest {
  token?: string;
  max: number;
}

export interface OffsetPaginationResponse {
  count: number;
}

export interface KeysetPaginationResponse {
  token: string | null;
}

export interface MessageResponse {
  message: string;
}
