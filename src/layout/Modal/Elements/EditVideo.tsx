import { useRouter } from 'next/router';

import Button from '@/components/common/Element/Button';
import { useModal } from '@/hooks/ui/modal';
import { useContinueUploadMutation } from '@/store/features/upload/upload.api';
import { EditVideoModal } from '@/store/features/ui/ui.type';

export default function EditVideo() {
  const router = useRouter();
  const { modal, complete, cancel } = useModal<EditVideoModal>();
  const [continueUpload, { isLoading }] = useContinueUploadMutation();

  const editVideoHandler = async () => {
    if (!modal) return;
    await continueUpload(modal.videoId).unwrap();
    router.push('/upload');
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <h3 className="text-xl font-bold">Edit Video</h3>
      <div className="flex flex-col gap-2">
        <h4 className="text-warning font-bold">&#9888; WARNING!</h4>
        <div className="max-w-lg">
          There is an unfinished upload process with other video. The unsaved
          changes of it will be lost if you choose to edit different video. Are
          you sure to continue?
        </div>
      </div>
      <div className="flex ml-auto gap-2">
        <Button small onClick={cancel}>
          Cancel
        </Button>
        <Button small inversed loading={isLoading} onClick={editVideoHandler}>
          Edit
        </Button>
      </div>
    </div>
  );
}
