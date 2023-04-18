import { useRouter } from 'next/router';

import PromptModal from '../Template/Prompt';
import { useModal } from '@/hooks/ui/modal';
import { useAppDispatch } from '@/hooks/store';
import { clearUpload } from '@/store/features/upload/upload.slice';

export default function UndoUpload() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { complete, cancel } = useModal();

  const clearUploadHandler = async () => {
    await router.replace('/user/videos');
    dispatch(clearUpload());
    complete();
  };

  return (
    <PromptModal
      title="Undo Upload"
      body="Your upload process is unfinished and the unsaved changes will be lost. Are you sure to continue?"
      action="Undo"
      warning
      onCancel={cancel}
      onClick={clearUploadHandler}
    />
  );
}
