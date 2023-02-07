import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Mutex } from 'async-mutex';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';

import type { AppState, AppBaseQuery } from '..';
import { setMessage, clearMessage } from '../features/ui/ui.slice';
import { setCredentials, clearUser } from '../features/user/user.slice';
import { Credentials } from '../features/user/user.type';

export const appApi = createApi({
  baseQuery: configureBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ['User', 'UserInfo', 'History'],
});

export const { getRunningQueriesThunk } = appApi.util;

function configureBaseQuery() {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? process.env.SERVER_URL
    : process.env.NEXT_PUBLIC_SERVER_URL;

  let baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken, refreshTokenExp } = (getState() as AppState).user;

      if (refreshTokenExp && accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }) as AppBaseQuery;

  baseQuery = configureReauthentication(baseQuery);
  baseQuery = configureUnauthorized(baseQuery);
  baseQuery = configureResponse(baseQuery);
  baseQuery = configureMetadata(baseQuery);

  return baseQuery;
}

function configureReauthentication(baseQuery: AppBaseQuery): AppBaseQuery {
  const mutex = new Mutex();
  return async (args, api, extraOptions) => {
    const { dispatch, getState } = api;
    const { accessToken, refreshTokenExp } = (getState() as AppState).user;
    let tokenExpired = false;

    if (refreshTokenExp && !accessToken) {
      tokenExpired = true;
    }

    if (refreshTokenExp && accessToken) {
      const { exp } = jwtDecode<JwtPayload>(accessToken);
      tokenExpired = dayjs.unix(exp as number).isBefore(dayjs());
    }

    if (refreshTokenExp && dayjs().isAfter(refreshTokenExp)) {
      dispatch(clearUser());
    }

    if (!tokenExpired) {
      return baseQuery(args, api, extraOptions);
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      const url = 'users/current/credentials';
      const credentials = 'include';
      const { data } = await baseQuery({ url, credentials }, api, extraOptions);

      dispatch(setCredentials(data as Credentials));
      release();
    } else {
      await mutex.waitForUnlock();
    }

    return baseQuery(args, api, extraOptions);
  };
}

function configureUnauthorized(baseQuery: AppBaseQuery): AppBaseQuery {
  return async (args, api, extraOptions) => {
    const { dispatch } = api;

    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      dispatch(clearUser());
      const url = 'users/signout';
      const credentials = 'include';
      return baseQuery({ url, method: 'POST', credentials }, api, extraOptions);
    }

    return result;
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

    if (extraOptions && extraOptions.ignoreMessage) {
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

function configureMetadata(baseQuery: AppBaseQuery): AppBaseQuery {
  return async (args, api, extraOptions) => {
    const { info } = (api.getState() as AppState).user;
    const userId = info ? info.id : null;
    const environment = typeof window === 'undefined' ? 'server' : 'client';

    const result = await baseQuery(args, api, extraOptions);

    return {
      ...result,
      meta: result.meta && { ...result.meta, userId, environment },
    };
  };
}
