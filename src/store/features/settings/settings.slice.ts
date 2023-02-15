import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { appListener } from '@/store/app/listener';
import { SettingsSliceState } from './settings.type';

const initialState: SettingsSliceState = {
  darkMode: false,
  pageSize: 30,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode(state, { payload }: PayloadAction<boolean>) {
      state.darkMode = payload;
    },
  },
});

export const { setDarkMode } = settingsSlice.actions;

appListener.startListening({
  actionCreator: setDarkMode,
  effect: ({ payload }) => {
    if (typeof window === undefined) return;
    if (payload) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
});
