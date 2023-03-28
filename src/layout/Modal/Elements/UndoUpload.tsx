import Button from '@/components/common/Element/Button';
import { useModal } from '@/hooks/ui/modal';
import { useAppDispatch } from '@/hooks/store';
import { clearUpload } from '@/store/features/upload/upload.slice';
import { EditVideoModal } from '@/store/features/ui/ui.type';

export default function UndoUpload() {
  const dispatch = useAppDispatch();

  const { complete, cancel } = useModal<EditVideoModal>();

  const clearUploadHandler = () => {
    dispatch(clearUpload());
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <h3 className="text-xl font-bold">Undo Upload</h3>
      <div className="flex flex-col gap-2">
        <h4 className="text-warning font-bold">&#9888; WARNING!</h4>
        <div className="max-w-lg">
          Your upload process is unfinished and the unsaved changes will be
          lost. Are you sure to continue?
        </div>
      </div>
      <div className="flex ml-auto gap-2">
        <Button small onClick={cancel}>
          Cancel
        </Button>
        <Button small inversed onClick={clearUploadHandler}>
          Undo
        </Button>
      </div>
    </div>
  );
}
