import ModalRoute from './Route';
import Signin from './Elements/Signin';
import Signout from './Elements/Signout';
import DeleteVideo from './Elements/DeleteVideo';
import DeleteAccount from './Elements/DeleteAccount';
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
      <ModalRoute id="delete-video" element={DeleteVideo} />
      <ModalRoute id="delete-account" element={DeleteAccount} />
      <ModalRoute id="image" element={ImagePreview} />
    </>
  );
}
