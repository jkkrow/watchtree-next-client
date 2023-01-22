import { createSlice } from '@reduxjs/toolkit';

interface UiSliceState {
  messages: null[];
  modal: null;
}

const initialState: UiSliceState = {
  messages: [],
  modal: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMessage() {},
    clearMessage() {},
    setModal() {},
    clearModal() {},
  },
});
