import { useEffect } from 'react';

import { useAppDispatch } from '../store';
import { setScrollLock, clearScrollLock } from '@/store/features/ui/ui.slice';

export function useScrollLock(on: boolean, name: string, top?: number) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const position = top !== undefined ? top : scrollTop;
    const run = top !== undefined ? top !== null : scrollHeight > clientHeight;

    if (on && run) {
      dispatch(setScrollLock({ name, position }));
    }

    if (!on) {
      dispatch(clearScrollLock(name));
    }
  }, [on, name, top, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearScrollLock(name));
    };
  }, [dispatch, name]);
}
