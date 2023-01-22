import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import { appReducer } from './reducer';
import { appApi } from './api';
import { appListener } from './listener';
import { errorMiddleware } from './common/error.middleware';

export const appMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware<
    ReturnType<typeof appReducer>
  >
) => {
  const defaultMiddleware = getDefaultMiddleware({
    serializableCheck: { ignoredActions: ['persist/PERSIST'] },
  });

  defaultMiddleware.prepend(appListener.middleware);
  defaultMiddleware.concat(appApi.middleware);
  defaultMiddleware.concat(errorMiddleware);

  return defaultMiddleware;
};
