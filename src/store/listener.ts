import { createListenerMiddleware } from '@reduxjs/toolkit';

import type { AppStartListening } from '.';

const listener = createListenerMiddleware();

export const startListening = listener.startListening as AppStartListening;
export const stopListening = listener.stopListening;
export const clearListeners = listener.clearListeners;
export const listenerMiddleware = listener.middleware;
