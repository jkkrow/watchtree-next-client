import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { nextReduxCookieMiddleware } from 'next-redux-cookie-wrapper';

import { appReducer } from './reducer';
import { appApi } from './api';
import { appListener } from './listener';

export const appMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware<
    ReturnType<typeof appReducer>
  >
) => {
  const defaultMiddleware = getDefaultMiddleware();
  const cookieMiddlewareConfig = {
    subtrees: ['video.volume', 'user.info', 'user.credentials.refreshTokenExp'],
  };

  return defaultMiddleware
    .prepend(nextReduxCookieMiddleware(cookieMiddlewareConfig))
    .prepend(appListener.middleware)
    .concat(appApi.middleware);
};
