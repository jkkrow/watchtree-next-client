import type { QueryExtraOptions } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import type { AppBaseQuery } from '..';
import { KeysetPaginationRequest, KeysetPaginationResponse } from './api.type';

export const getInfiniteQueryOptions = <
  RequestType extends KeysetPaginationRequest,
  ResponseType extends KeysetPaginationResponse<unknown>
>(): Omit<
  QueryExtraOptions<string, ResponseType, RequestType, AppBaseQuery>,
  | 'type'
  | 'invalidatesTags'
  | 'providesTags'
  | 'Types'
  | 'onCacheEntryAdded'
  | 'onQueryStarted'
  | 'keepUnusedDataFor'
> => {
  return {
    merge: (currentResult, { items, token }, { arg }) => {
      if (arg.refetch) {
        currentResult.items = items;
      } else {
        currentResult.items.push(...items);
      }
      currentResult.token = token;
    },
    serializeQueryArgs: ({ endpointName }) => {
      return endpointName;
    },
    forceRefetch: ({ currentArg, previousArg }) => {
      return !!currentArg?.token && currentArg !== previousArg;
    },
  };
};
