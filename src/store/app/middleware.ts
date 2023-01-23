import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { nextReduxCookieMiddleware } from 'next-redux-cookie-wrapper';

import { appReducer } from './reducer';
import { appApi } from './api';
import { appListener } from './listener';
import { errorMiddleware } from './common/error.middleware';

export const appMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware<
    ReturnType<typeof appReducer>
  >
) => {
  const defaultMiddleware = getDefaultMiddleware();
  const cookieMiddlewareConfig = {
    subtrees: ['video.volume', 'user.userData'],
  };

  return defaultMiddleware
    .prepend(appListener.middleware)
    .prepend(nextReduxCookieMiddleware(cookieMiddlewareConfig))
    .concat(appApi.middleware)
    .concat(errorMiddleware);
};
