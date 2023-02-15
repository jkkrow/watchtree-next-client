import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { appApi } from './api';
import { uiSlice } from '../features/ui/ui.slice';
import { uploadSlice } from '../features/upload/upload.slice';
import { userSlice } from '../features/user/user.slice';
import { videoSlice } from '../features/video/video.slice';
import { settingsSlice } from '../features/settings/settings.slice';

const combinedReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  [uiSlice.name]: uiSlice.reducer,
  [uploadSlice.name]: uploadSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [videoSlice.name]: videoSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
});

export const appReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const appState = { ...state } as any;

    for (const slice in action.payload) {
      appState[slice] = { ...appState[slice], ...action.payload[slice] };
    }

    return appState;
  }

  return combinedReducer(state, action);
};
