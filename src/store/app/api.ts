import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { Mutex } from 'async-mutex';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import dayjs from 'dayjs';

import type { AppState, AppBaseQuery, AppBaseQueryConfig } from '..';
import { setMessage, clearMessage } from '../features/ui/ui.slice';
import { setCredentials, clearUser } from '../features/user/user.slice';
import { Credentials } from '../features/user/user.type';

export const appApi = createApi({
  baseQuery: configureBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ['User', 'Video', 'History'],
});

export const { getRunningQueriesThunk } = appApi.util;

export function axiosBaseQuery(config?: AppBaseQueryConfig): AppBaseQuery {
  const { baseURL, headers } = config || {};
  return async (arg) => {
    try {
      const axiosInstance = axios.create({ baseURL, headers });
      const { data, ...rest } = await axiosInstance(arg);
      return { data, meta: rest };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      const status = err.response?.status;
      const data = err.response?.data as any;
      return { error: { status, data: data || err.message } };
    }
  };
}

function configureBaseQuery(): AppBaseQuery {
  let baseQuery: AppBaseQuery = async (arg, api, extraOptions) => {
    const { getState } = api;
    const isServer = typeof window === 'undefined';
    const baseURL = isServer
      ? process.env.SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL;

    const { accessToken, refreshTokenExp } = (getState() as AppState).user;
    const headers: AxiosRequestConfig['headers'] = {};

    if (refreshTokenExp && accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const baseQuery = axiosBaseQuery({ baseURL, headers });
    return baseQuery(arg, api, extraOptions);
  };

  baseQuery = configureReauthentication(baseQuery);
  baseQuery = configureUnauthorized(baseQuery);
  baseQuery = configureMessageResponse(baseQuery);
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

      const customArg = {
        url: 'users/current/credentials',
        withCredentials: true,
      };
      const { data } = await baseQuery(customArg, api, extraOptions);

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
      const customArg = {
        url: 'users/signout',
        method: 'post',
        withCredentials: true,
      };
      return baseQuery(customArg, api, extraOptions);
    }

    return result;
  };
}

function configureMessageResponse(baseQuery: AppBaseQuery): AppBaseQuery {
  return async (args, api, extraOptions) => {
    const { dispatch, getState, endpoint: action } = api;
    const { messages } = (getState() as AppState).ui;
    const matchedMessage = messages.find((msg) => msg.action === action);

    if (matchedMessage) {
      dispatch(clearMessage(matchedMessage.id));
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
