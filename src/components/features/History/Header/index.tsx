import { skipToken } from '@reduxjs/toolkit/dist/query';

import Button from '@/components/common/Element/Button';
import UpdateIcon from '@/assets/icons/update.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import { useModal } from '@/hooks/ui/modal';
import { useGetHistoriesQuery } from '@/store/features/history/history.api';
import { GetHistoriesRequest } from '@/store/features/history/history.type';

interface HistoryHeaderProps {
  params?: GetHistoriesRequest;
}

export default function HistoryHeader({ params }: HistoryHeaderProps) {
  const { open } = useModal();
  const { refetch, isFetching, isLoading } = useGetHistoriesQuery(
    params || skipToken,
    { skip: !params }
  );

  const clearHistoryHandler = () => {
    open('clear-history');
  };

  return (
    <div className="flex flex-col justify-between sm:flex-row items-center w-full mb-6 gap-8">
      <div className="text-xl font-bold">
        <h2>Watch History</h2>
      </div>
      <div className="flex ml-auto gap-4">
        <Button
          small
          inversed
          loading={!isLoading && isFetching}
          onClick={refetch}
        >
          <UpdateIcon className="w-6 h-6" />
        </Button>
        <Button small onClick={clearHistoryHandler}>
          <DeleteIcon className="w-5 h-5" />
          <span>Clear History</span>
        </Button>
      </div>
    </div>
  );
}
