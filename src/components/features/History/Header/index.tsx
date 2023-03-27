import Button from '@/components/common/Element/Button';
import DeleteIcon from '@/assets/icons/delete.svg';
import { useModal } from '@/hooks/ui/modal';

export default function HistoryHeader() {
  const { open } = useModal();

  const clearHistoryHandler = () => {
    open('clear-history');
  };

  return (
    <div className="flex flex-col justify-between sm:flex-row items-center w-full mb-6 gap-8">
      <div className="text-xl font-bold">
        <h2>Watch History</h2>
      </div>
      <div className="flex ml-auto gap-4">
        <Button small onClick={clearHistoryHandler}>
          <DeleteIcon width={20} height={20} />
          <span>Clear History</span>
        </Button>
      </div>
    </div>
  );
}
