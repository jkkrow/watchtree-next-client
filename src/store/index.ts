import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { createWrapper } from 'next-redux-wrapper';
import { wrapMakeStore } from 'next-redux-cookie-wrapper';

import { appReducer } from './app/reducer';
import { appMiddleware } from './app/middleware';

const store = configureStore({
  reducer: appReducer,
  middleware: appMiddleware,
});

setupListeners(store.dispatch);

export const wrapper = createWrapper(wrapMakeStore(() => store));

export type AppState = ReturnType<typeof store['getState']>;
export type AppDispatch = typeof store['dispatch'];
export type AppThunk<T = void> = ThunkAction<T, AppState, unknown, Action>;
