import { useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../store';
import { setModal, clearModal } from '@/store/features/ui/ui.slice';
import { Modal, ModalPayload, ModalRoutes } from '@/store/features/ui/ui.type';

export function useModal<Payload extends ModalPayload = {}>() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(
    (state) => state.ui.modal
  ) as Modal<Payload> | null;

  const open = useCallback(
    (id: ModalRoutes, payload?: Payload) => {
      dispatch(setModal({ id, ...payload }));
    },
    [dispatch]
  );

  const close = useCallback(() => {
    dispatch(clearModal());
  }, [dispatch]);

  return { modal, open, close };
}
