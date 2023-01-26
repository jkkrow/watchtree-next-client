import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomUUID } from 'crypto';

import { UiSliceState, Message } from './ui.type';

const initialState: UiSliceState = {
  messages: [],
  modal: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMessage(state, { payload }: PayloadAction<Omit<Message, 'id'>>) {
      state.messages.push({ id: randomUUID(), ...payload });
    },
    clearMessage(state, { payload }: PayloadAction<{ id: string }>) {
      state.messages = state.messages.filter((msg) => msg.id !== payload.id);
    },
  },
});

export const { setMessage, clearMessage } = uiSlice.actions;
