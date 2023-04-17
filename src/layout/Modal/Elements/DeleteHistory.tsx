import Button from '@/components/common/Element/Button';
import { useModal } from '@/hooks/ui/modal';
import { useDeleteHistoryMutation } from '@/store/features/history/history.api';
import { DeleteHistoryModal } from '@/store/features/ui/ui.type';

export default function DeleteHistory() {
  const { modal, complete, cancel } = useModal<DeleteHistoryModal>();
  const [deleteHistory, { isLoading }] = useDeleteHistoryMutation();

  const clearHistoryHandler = async () => {
    if (!modal) return;
    await deleteHistory(modal.videoId).unwrap();
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <h3 className="text-xl font-bold">Delete History</h3>
      <div className="p-2 font-medium">
        <p>Do you really want to delete the history of this video?</p>
      </div>
      <div className="flex w-80 ml-auto gap-2">
        <Button onClick={cancel}>Cancel</Button>
        <Button inversed loading={isLoading} onClick={clearHistoryHandler}>
          Delete
        </Button>
      </div>
    </div>
  );
}
