import { useCallback } from 'react';
import EventEmitter from 'events';

import { useAppSelector, useAppDispatch } from '../store';
import { setModal, clearModal } from '@/store/features/ui/ui.slice';
import {
  ModalPayload,
  ModalRoutes,
  ModalStatus,
} from '@/store/features/ui/ui.type';

const eventBus = new EventEmitter();

export function useModal<Payload extends ModalPayload = {}>() {
  const modal = useAppSelector((state) => state.ui.modal);
  const dispatch = useAppDispatch();

  const open = useCallback(
    (id: ModalRoutes, payload?: Payload): Promise<ModalStatus> => {
      dispatch(setModal({ id, status: 'pending', ...payload }));
      return new Promise((resolve) =>
        eventBus.once('status', (event) => resolve(event))
      );
    },
    [dispatch]
  );

  const cancel = useCallback(() => {
    if (!modal) return;
    dispatch(setModal({ ...modal, status: 'cancelled' }));
    eventBus.emit('status', 'cancelled');
  }, [modal, dispatch]);

  const complete = useCallback(() => {
    if (!modal) return;
    dispatch(setModal({ ...modal, status: 'completed' }));
    eventBus.emit('status', 'completed');
  }, [modal, dispatch]);

  const clear = useCallback(() => {
    dispatch(clearModal());
  }, [dispatch]);

  return { modal, open, cancel, complete, clear };
}
