import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { Mutex } from 'async-mutex';
import { decodeJwt } from 'jose';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import dayjs from 'dayjs';

import type { AppState, AppBaseQuery, AppBaseQueryConfig } from '..';
import { setMessage, clearMessage } from '../features/ui/ui.slice';
import { setCredentials, clearUser } from '../features/user/user.slice';
import { MessageResponse } from '../common/api.type';
import { Credentials } from '../features/user/user.type';

export const appApi = createApi({
  baseQuery: configureBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ['User', 'Video', 'History', 'Subscription'],
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
      ? process.env.SERVER_DOMAIN
      : process.env.NEXT_PUBLIC_SERVER_DOMAIN;

    const { accessToken, refreshTokenExp } = (getState() as AppState).user;
    const headers: AxiosRequestConfig['headers'] = {};

    if (refreshTokenExp && accessToken) {
      const { exp } = decodeJwt(accessToken);
      const tokenExpired = dayjs.unix(exp as number).isBefore(dayjs());

      !tokenExpired && (headers.Authorization = `Bearer ${accessToken}`);
    }

    const baseQuery = axiosBaseQuery({ baseURL, headers });
    return baseQuery(arg, api, extraOptions);
  };

  baseQuery = configureReauthentication(baseQuery);
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
      const { exp } = decodeJwt(accessToken);
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

      const { data: credentials, error } = await baseQuery(
        { url: 'users/current/credentials', withCredentials: true },
        api,
        extraOptions
      );

      if (error) {
        dispatch(clearUser());
        const signoutResult = await baseQuery(
          { url: 'users/signout', method: 'post', withCredentials: true },
          api,
          { ignoreMessage: true }
        );

        release();
        return signoutResult;
      }

      dispatch(setCredentials(credentials as Credentials));
      release();
    } else {
      await mutex.waitForUnlock();
    }

    return baseQuery(args, api, extraOptions);
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

    if (extraOptions?.ignoreMessage) {
      return result;
    }

    if (result.error) {
      const data = result.error.data;
      let subject = 'Unknown Error';
      let content = 'Please try again later';

      subject = typeof data === 'string' ? data : data?.error || subject;
      content = typeof data === 'string' ? content : data?.message || content;

      dispatch(setMessage({ type: 'error', action, subject, content }));
    }

    if (result.data && (result.data as MessageResponse).message) {
      const content = (result.data as MessageResponse).message;
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
