import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {
  nextReduxCookieMiddleware,
  NextReduxCookieMiddlewareConfig,
} from 'next-redux-cookie-wrapper';

import { appReducer } from './reducer';
import { appApi } from './api';
import { appListener } from './listener';

export const appMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware<
    ReturnType<typeof appReducer>
  >
) => {
  const defaultMiddleware = getDefaultMiddleware();
  const cookieMiddlewareConfig: NextReduxCookieMiddlewareConfig = {
    subtrees: ['video.volume', 'user.info', 'user.refreshTokenExp'],
  };

  return defaultMiddleware
    .prepend(nextReduxCookieMiddleware(cookieMiddlewareConfig))
    .prepend(appListener.middleware)
    .concat(appApi.middleware);
};
