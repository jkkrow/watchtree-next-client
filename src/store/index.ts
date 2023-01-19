import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  TypedStartListening,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { createWrapper } from 'next-redux-wrapper';

import { listenerMiddleware } from './listener';
import { uploadSlice } from './upload/upload.slice';
import { videoSlice } from './video/video.slice';
import { uploadApi } from './upload/upload.service';
import { videoApi } from './video/video.service';

function makeStore() {
  const combinedReducer = combineReducers({
    [uploadApi.reducerPath]: uploadApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [uploadSlice.name]: uploadSlice.reducer,
    [videoSlice.name]: videoSlice.reducer,
  });

  const rootReducer: typeof combinedReducer = (state, action) => {
    if (action.type === 'HYDRATE') return { ...state, ...action.payload };
    return combinedReducer(state, action);
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware)
        .concat([uploadApi.middleware, videoApi.middleware]),
  });

  setupListeners(store.dispatch);

  return store;
}

export const wrapper = createWrapper(makeStore);

export type AppState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type AppThunk<T = void> = ThunkAction<T, AppState, unknown, Action>;
export type AppStartListening = TypedStartListening<AppState, AppDispatch>;
