import {
  createListenerMiddleware,
  ListenerMiddlewareInstance,
} from '@reduxjs/toolkit';

import type { AppState } from '..';

export const appListener: ListenerMiddlewareInstance<AppState> =
  createListenerMiddleware();
