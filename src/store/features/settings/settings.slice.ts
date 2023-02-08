import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  pageSize: 30,
};

export const settingsSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: { setTheme() {} },
});

export const { setTheme } = settingsSlice.actions;
