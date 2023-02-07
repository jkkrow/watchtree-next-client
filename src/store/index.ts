import {
  configureStore,
  ThunkAction,
  Action,
  ListenerMiddlewareInstance,
  TypedStartListening,
} from '@reduxjs/toolkit';
import {
  setupListeners,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { createWrapper } from 'next-redux-wrapper';
import { wrapMakeStore } from 'next-redux-cookie-wrapper';

import { appReducer } from './app/reducer';
import { appMiddleware } from './app/middleware';

function makeStore() {
  const store = configureStore({
    reducer: appReducer,
    middleware: appMiddleware,
  });

  setupListeners(store.dispatch);

  return store;
}

export const wrapper = createWrapper(wrapMakeStore(makeStore));

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<T = void> = ThunkAction<T, AppState, unknown, Action>;
export type AppBaseQuery = BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError,
  AppQueryExtraOptions,
  FetchBaseQueryMeta & AppQueryMeta
>;
export type AppQueryExtraOptions = { ignoreMessage?: boolean };
export type AppQueryMeta = {
  userId: string | null;
  environment: 'server' | 'client';
};
export interface AppListener extends ListenerMiddlewareInstance {
  startListening: TypedStartListening<AppState, AppDispatch>;
}
