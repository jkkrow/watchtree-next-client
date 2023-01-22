import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

interface UserSliceState {
  refreshToken: string | null;
  accessToken: string | null;
  userData: null;
}

const initialState: UserSliceState = {
  accessToken: null,
  refreshToken: null,
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin() {},
    signout() {},
    setTokens() {},
    setUserData() {},
  },
});

export const userPersistConfig = {
  key: userSlice.name,
  blacklist: ['accessToken'],
  storage,
};
