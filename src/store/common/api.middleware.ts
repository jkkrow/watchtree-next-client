import { Middleware, isPending } from '@reduxjs/toolkit';

import type { AppState } from '..';
import { KeysetPaginationRequest, KeysetPaginationResponse } from './api.type';

export const refetchMiddleware: Middleware = (api) => (next) => (action) => {
  if (!isPending(action) || !action.meta || !action.meta.arg) {
    return next(action);
  }

  const { type, endpointName, originalArgs } = action.meta.arg;
  const state = api.getState() as AppState;
  const latestQuery = state.api.queries[endpointName];

  if (type !== 'query' || !originalArgs || !latestQuery) {
    return next(action);
  }

  const queryArg = originalArgs as KeysetPaginationRequest;
  const latestData = latestQuery.data as KeysetPaginationResponse<unknown>;
  const { items: latestItems, token: latestToken } = latestData;

  if (!latestItems || !latestItems.length || latestToken === undefined) {
    return next(action);
  }

  if (queryArg.token === latestToken && latestToken !== null) {
    return next(action);
  }

  action.meta.arg.originalArgs = {
    ...originalArgs,
    max: latestItems.length,
    token: null,
    refetch: true,
  } as KeysetPaginationRequest;

  return next(action);
};
