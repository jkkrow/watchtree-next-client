import Button from '@/components/common/Element/Button';
import { useModal } from '@/hooks/ui/modal';
import { useClearHistoryMutation } from '@/store/features/history/history.api';

export default function ClearHistory() {
  const { complete, cancel } = useModal();
  const [clearHistory, { isLoading }] = useClearHistoryMutation();

  const clearHistoryHandler = async () => {
    await clearHistory();
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <h3 className="text-xl font-bold">Clear History</h3>
      <div className="p-2 font-medium">
        <p>Do you really want to delete all histories?</p>
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
