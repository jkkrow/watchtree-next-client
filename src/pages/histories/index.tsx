import { useGetHistoriesQuery } from '@/store/features/history/history.api';

export default function Histories() {
  const { data, isFetching, isLoading } = useGetHistoriesQuery({ max: 30 });

  return <div></div>;
}
