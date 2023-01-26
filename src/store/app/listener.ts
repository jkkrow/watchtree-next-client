import { createListenerMiddleware } from '@reduxjs/toolkit';

import type { AppListener } from '..';

export const appListener = createListenerMiddleware() as AppListener;
