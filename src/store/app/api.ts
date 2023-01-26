import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Mutex } from 'async-mutex';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';

import type { AppState, AppBaseQuery } from '..';
import { setMessage, clearMessage } from '../features/ui/ui.slice';
import { setUser } from '../features/user/user.slice';
import { Credentials } from '../features/user/user.type';

export const appApi = createApi({
  baseQuery: configureBaseQuery(),
  endpoints: () => ({}),
});

export const { getRunningQueriesThunk } = appApi.util;

function configureBaseQuery() {
  const baseQuery: AppBaseQuery = fetchBaseQuery({
    baseUrl: process.env.SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const { credentials } = (getState() as AppState).user;

      if (credentials) {
        headers.set('Authorization', `Bearer ${credentials.accessToken}`);
      }

      return headers;
    },
  });

  const baseQueryWithAuth = configureAuth(baseQuery);
  const baseQueryWithResponse = configureResponse(baseQueryWithAuth);

  return baseQueryWithResponse;
}

function configureAuth(baseQuery: AppBaseQuery): AppBaseQuery {
  const mutex = new Mutex();
  return async (args, api, extraOptions) => {
    const { dispatch, getState } = api;
    const { credentials } = (getState() as AppState).user;
    let tokenExpired = false;

    if (credentials) {
      const { exp } = jwtDecode<JwtPayload>(credentials.accessToken);
      tokenExpired = dayjs.unix(exp as number).isBefore(dayjs());
    }

    if (!tokenExpired) {
      return baseQuery(args, api, extraOptions);
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const endpoint = 'users/current/credentials';
      const { data } = await baseQuery(endpoint, api, extraOptions);

      dispatch(setUser({ credentials: data as Credentials }));
      release();
    } else {
      await mutex.waitForUnlock();
    }

    return baseQuery(args, api, extraOptions);
  };
}

function configureResponse(baseQuery: AppBaseQuery): AppBaseQuery {
  return async (args, api, extraOptions) => {
    const { dispatch, getState, endpoint: action } = api;
    const { messages } = (getState() as AppState).ui;
    const matchedMessage = messages.find((msg) => msg.action === action);

    if (matchedMessage) {
      dispatch(clearMessage({ id: matchedMessage.id }));
    }

    const result = await baseQuery(args, api, extraOptions);

    if (extraOptions && !extraOptions.ignoreMessage) {
      return result;
    }

    if (result.error) {
      const data: any = result.error.data;
      const subject = data?.error || 'Unknown Error';
      const content = data?.message || 'Something went wrong';
      dispatch(setMessage({ type: 'error', action, subject, content }));
    }

    if (result.data && (result.data as any).message) {
      const content = (result.data as any).message;
      dispatch(setMessage({ type: 'message', action, content }));
    }

    return result;
  };
}
