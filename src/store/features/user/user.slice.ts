import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSliceState, User, Credentials } from './user.type';

const initialState: UserSliceState = {
  info: null,
  accessToken: null,
  refreshTokenExp: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo(state, { payload }: PayloadAction<User>) {
      state.info = payload;
    },
    setCredentials(state, { payload }: PayloadAction<Credentials>) {
      state.accessToken = payload.accessToken;
      state.refreshTokenExp = payload.refreshTokenExp;
    },
    clearUser(state) {
      state.info = null;
      state.accessToken = null;
      state.refreshTokenExp = null;
    },
  },
});

export const { setInfo, setCredentials, clearUser } = userSlice.actions;
