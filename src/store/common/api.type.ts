export interface OffsetPaginationRequest {
  page: number;
  max: number;
  refetch?: boolean;
}

export interface KeysetPaginationRequest {
  token: string | null;
  max: number;
  refetch?: boolean;
}

export interface OffsetPaginationResponse<T> {
  items: T[];
  count?: number;
}

export interface KeysetPaginationResponse<T> {
  items: T[];
  token: string | null;
}

export interface MessageResponse {
  message: string;
}
