import { useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../store';
import { setModal, clearModal } from '@/store/features/ui/ui.slice';
import { Modal } from '@/store/features/ui/ui.type';

export function useModal() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.ui.modal);

  const open = useCallback(
    (modal: Modal) => {
      dispatch(setModal(modal));
    },
    [dispatch]
  );

  const close = useCallback(() => {
    dispatch(clearModal());
  }, [dispatch]);

  return { modal, open, close };
}
