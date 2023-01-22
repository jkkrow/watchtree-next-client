import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { appApi } from './api';
import { uiSlice } from '../features/ui/ui.slice';
import { uploadSlice } from '../features/upload/upload.slice';
import { userSlice } from '../features/user/user.slice';
import { videoSlice } from '../features/video/video.slice';

const appPersistConfig = {
  key: 'app',
  storage: storage,
  whitelist: [userSlice.name],
};

const combinedReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  [uiSlice.name]: uiSlice.reducer,
  [uploadSlice.name]: uploadSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [videoSlice.name]: videoSlice.reducer,
});

const hydratedReducer: typeof combinedReducer = (state, action) => {
  if (action.type === 'HYDRATE') return { ...state, ...action.payload };
  return combinedReducer(state, action);
};

export const appReducer = persistReducer(appPersistConfig, hydratedReducer);
