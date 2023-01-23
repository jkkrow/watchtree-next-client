import { createSlice } from '@reduxjs/toolkit';

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
