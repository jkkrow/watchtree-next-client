import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { appListener } from '@/store/app/listener';
import { UiSliceState, Message, Modal } from './ui.type';

const initialState: UiSliceState = {
  messages: [],
  modal: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMessage(state, { payload }: PayloadAction<Omit<Message, 'id'>>) {
      state.messages.push({ id: uuidv4(), ...payload });
    },
    clearMessage(state, { payload }: PayloadAction<string>) {
      state.messages = state.messages.filter((msg) => msg.id !== payload);
    },
    setModal(state, { payload }: PayloadAction<Modal>) {
      state.modal = payload;
    },
    clearModal(state) {
      state.modal = null;
    },
  },
});

export const { setMessage, clearMessage, setModal, clearModal } =
  uiSlice.actions;

appListener.startListening({
  actionCreator: setMessage,
  effect: (_, { dispatch, getState }) => {
    const { messages } = getState().ui;
    if (messages.length < 4) return;

    dispatch(clearMessage(messages[0].id));
  },
});
