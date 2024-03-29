import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {
  nextReduxCookieMiddleware,
  NextReduxCookieMiddlewareConfig,
} from 'next-redux-cookie-wrapper';

import { appReducer } from './reducer';
import { appApi } from './api';
import { appListener } from './listener';
import { refetchMiddleware } from '../common/api.middleware';

export const appMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware<
    ReturnType<typeof appReducer>
  >
) => {
  const defaultMiddleware = getDefaultMiddleware();

  const day = 60 * 60 * 24;
  const week = day * 7;
  const year = day * 365;

  const cookieMiddlewareConfig: NextReduxCookieMiddlewareConfig = {
    compress: false,
    subtrees: [
      {
        subtree: 'video.volume',
        maxAge: year,
      },
      {
        subtree: 'video.resolution',
        maxAge: year,
      },
      {
        subtree: 'video.playbackRate',
        maxAge: year,
      },
      {
        subtree: 'user.info',
        maxAge: week,
      },
      {
        subtree: 'user.refreshTokenExp',
        maxAge: week,
      },
      {
        subtree: 'settings',
        maxAge: year,
      },
    ],
  };

  return defaultMiddleware
    .prepend(nextReduxCookieMiddleware(cookieMiddlewareConfig))
    .prepend(appListener.middleware)
    .concat(appApi.middleware)
    .concat(refetchMiddleware);
};
