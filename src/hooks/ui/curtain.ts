import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { setCurtain, clearCurtain } from '@/store/features/ui/ui.slice';
import { Curtain } from '@/store/features/ui/ui.type';

export function useCurtain() {
  const curtain = useAppSelector((state) => state.ui.curtain);
  const dispatch = useAppDispatch();

  const open = useCallback(
    (payload: Curtain) => {
      dispatch(setCurtain(payload));
    },
    [dispatch]
  );

  const close = useCallback(() => {
    dispatch(clearCurtain());
  }, [dispatch]);

  return { curtain, open, close };
}
