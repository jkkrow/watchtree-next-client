import PromptModal from '../Template/Prompt';
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
    <PromptModal
      title="Clear History"
      action="Clear"
      header="Do you really want to delete all of watch history?"
      body={
        <>
          <p>
            This process <b>cannot</b> be undone. Histories will no longer be
            available.
          </p>
          <p>
            To proceed, press <b>Clear</b> button
          </p>
        </>
      }
      danger
      loading={isLoading}
      onCancel={cancel}
      onClick={clearHistoryHandler}
    />
  );
}
