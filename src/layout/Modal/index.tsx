import ModalRoute from './Route';
import Signin from './Elements/Signin';
import Signout from './Elements/Signout';
import EditVideo from './Elements/EditVideo';
import DeleteVideo from './Elements/DeleteVideo';
import DeleteAccount from './Elements/DeleteAccount';
import ClearHistory from './Elements/ClearHistory';
import UndoUpload from './Elements/UndoUpload';
import ImagePreview from './Elements/ImagePreview';
import { useAppSelector } from '@/hooks/store';
import { useScrollLock } from '@/hooks/ui/scroll-lock';

export default function Modal() {
  const modal = useAppSelector((state) => state.ui.modal);

  useScrollLock(!!modal);

  return (
    <>
      <ModalRoute id="signin" element={Signin} />
      <ModalRoute id="signout" element={Signout} />
      <ModalRoute id="edit-video" element={EditVideo} />
      <ModalRoute id="delete-video" element={DeleteVideo} />
      <ModalRoute id="delete-account" element={DeleteAccount} />
      <ModalRoute id="clear-history" element={ClearHistory} />
      <ModalRoute id="undo-upload" element={UndoUpload} />
      <ModalRoute id="image" element={ImagePreview} />
    </>
  );
}
