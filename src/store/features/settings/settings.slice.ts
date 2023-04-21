import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { appListener } from '@/store/app/listener';
import { SettingsSliceState, UploadConfig } from './settings.type';

const initialState: SettingsSliceState = {
  darkMode: false,
  upload: { popupSize: 'brief' },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode(state, { payload }: PayloadAction<boolean>) {
      state.darkMode = payload;
    },
    setUploadConfig(state, { payload }: PayloadAction<Partial<UploadConfig>>) {
      state.upload = { ...state.upload, ...payload };
    },
  },
});

export const { setDarkMode, setUploadConfig } = settingsSlice.actions;

appListener.startListening({
  actionCreator: setDarkMode,
  effect: ({ payload }) => {
    if (typeof window === undefined) return;
    document.documentElement.classList.toggle('dark', payload);
  },
});
