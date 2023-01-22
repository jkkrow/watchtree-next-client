import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore } from 'redux-persist';

import { appReducer } from './app/reducer';
import { appMiddleware } from './app/middleware';

const store = configureStore({
  reducer: appReducer,
  middleware: appMiddleware,
});

setupListeners(store.dispatch);

export const wrapper = createWrapper(() => store);
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store['getState']>;
export type AppDispatch = typeof store['dispatch'];
export type AppThunk<T = void> = ThunkAction<T, AppState, unknown, Action>;
