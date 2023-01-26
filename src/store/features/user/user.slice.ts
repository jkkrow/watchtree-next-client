import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSliceState } from './user.type';

const initialState: UserSliceState = {
  info: null,
  credentials: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<Partial<UserSliceState>>) {
      const { info, credentials } = payload;
      state.info = info || state.info;
      state.credentials = credentials || state.credentials;
    },
    clearUser(state) {
      state.info = null;
      state.credentials = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
