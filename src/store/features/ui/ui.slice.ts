import {
  createSlice,
  PayloadAction,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { AppBaseQueryError, AppQueryMeta } from '@/store';
import { appListener } from '@/store/app/listener';
import { UiSliceState, Message, Curtain, Modal, ScrollLock } from './ui.type';
import { MessageResponse } from '@/store/common/api.type';

const initialState: UiSliceState = {
  messages: [],
  modal: null,
  curtain: null,
  scrollLock: null,
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
    setCurtain(state, { payload }: PayloadAction<Curtain>) {
      state.curtain = payload;
    },
    clearCurtain(state) {
      state.curtain = null;
    },
    setModal(state, { payload }: PayloadAction<Modal>) {
      state.modal = payload;
    },
    clearModal(state) {
      state.modal = null;
    },
    setScrollLock(state, { payload }: PayloadAction<ScrollLock>) {
      if (state.scrollLock) return;
      state.scrollLock = payload;
    },
    clearScrollLock(state, { payload }: PayloadAction<string>) {
      if (state.scrollLock && state.scrollLock.name !== payload) return;
      state.scrollLock = null;
    },
  },
});

export const {
  setMessage,
  clearMessage,
  setModal,
  clearModal,
  setCurtain,
  clearCurtain,
  setScrollLock,
  clearScrollLock,
} = uiSlice.actions;

appListener.startListening({
  actionCreator: setMessage,
  effect: (_, { dispatch, getState }) => {
    const { messages } = getState().ui;
    if (messages.length < 4) return;

    dispatch(clearMessage(messages[0].id));
  },
});

appListener.startListening({
  matcher: isFulfilled,
  effect: ({ payload, meta }, { dispatch }) => {
    const data = payload as MessageResponse;
    const queryMeta: AppQueryMeta | undefined = (meta as any).baseQueryMeta;

    if (!data.message) return;
    if (queryMeta?.extraOptions?.ignoreMessage) return;

    const content = (payload as MessageResponse).message;
    dispatch(setMessage({ type: 'message', content }));
  },
});

appListener.startListening({
  matcher: isRejectedWithValue,
  effect: ({ payload, meta }, { dispatch }) => {
    const data = (payload as AppBaseQueryError).data;
    const queryMeta: AppQueryMeta | undefined = (meta as any).baseQueryMeta;

    if (data === 'canceled') return;
    if (queryMeta?.extraOptions?.ignoreMessage) return;

    let subject = 'Unknown Error';
    let content = 'Please try again later';

    subject = typeof data === 'string' ? data : data?.error || subject;
    content = typeof data === 'string' ? content : data?.message || content;

    dispatch(setMessage({ type: 'error', subject, content }));
  },
});

appListener.startListening({
  actionCreator: setScrollLock,
  effect: ({ payload }, { getState }) => {
    const { scrollLock } = getState().ui;

    if (!scrollLock || scrollLock.name !== payload.name) return;
    const { classList, style } = document.documentElement;

    style.top = `-${payload.position}px`;
    classList.add('fixed');
    classList.add('overflow-y-scroll');
    classList.add('w-full');
  },
});

appListener.startListening({
  actionCreator: clearScrollLock,
  effect: ({ payload }, { getOriginalState }) => {
    const { scrollLock } = getOriginalState().ui;

    if (!scrollLock || scrollLock.name !== payload) return;
    const { classList, style } = document.documentElement;

    classList.remove('fixed');
    classList.remove('overflow-y-scroll');
    classList.remove('w-full');
    style.removeProperty('top');
    document.documentElement.scrollTop = scrollLock.position;
  },
});
