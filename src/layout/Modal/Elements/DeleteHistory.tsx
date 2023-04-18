import PromptModal from '../Template/Prompt';
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
    <PromptModal
      title="Delete History"
      action="Delete"
      header="Do you really want to delete the history of this video?"
      loading={isLoading}
      onCancel={cancel}
      onClick={clearHistoryHandler}
    />
  );
}
