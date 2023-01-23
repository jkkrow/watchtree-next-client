import {
  createListenerMiddleware,
  ListenerMiddlewareInstance,
  TypedStartListening,
} from '@reduxjs/toolkit';

import type { AppState, AppDispatch } from '..';

export interface AppListener extends ListenerMiddlewareInstance {
  startListening: TypedStartListening<AppState, AppDispatch>;
}

export const appListener = createListenerMiddleware() as AppListener;
