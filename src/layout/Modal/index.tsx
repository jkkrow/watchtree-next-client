import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ModalRoute from './Route';
import Signin from './Elements/Signin';
import Signout from './Elements/Signout';
import EditVideo from './Elements/EditVideo';
import DeleteVideo from './Elements/DeleteVideo';
import DeleteAccount from './Elements/DeleteAccount';
import DeleteHistory from './Elements/DeleteHistory';
import ClearHistory from './Elements/ClearHistory';
import UndoUpload from './Elements/UndoUpload';
import DiscardNode from './Elements/DiscardNode';
import ImagePreview from './Elements/ImagePreview';
import { useModal } from '@/hooks/ui/modal';
import { useScrollLock } from '@/hooks/ui/scroll-lock';

export default function Modal() {
  const { modal, cancel } = useModal();
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', cancel);

    return () => {
      router.events.off('routeChangeStart', cancel);
    };
  }, [router.events, cancel]);

  useScrollLock(!!modal, true);

  return (
    <>
      <ModalRoute id="signin" element={Signin} />
      <ModalRoute id="signout" element={Signout} />
      <ModalRoute id="edit-video" element={EditVideo} />
      <ModalRoute id="delete-video" element={DeleteVideo} />
      <ModalRoute id="delete-account" element={DeleteAccount} />
      <ModalRoute id="delete-history" element={DeleteHistory} />
      <ModalRoute id="clear-history" element={ClearHistory} />
      <ModalRoute id="undo-upload" element={UndoUpload} />
      <ModalRoute id="discard-node" element={DiscardNode} />
      <ModalRoute id="image" element={ImagePreview} />
    </>
  );
}
