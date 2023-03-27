import Head from 'next/head';

import HistoryLayout from '@/components/features/History/_layout';
import HistoryHeader from '@/components/features/History/Header';
import HistoryGrid from '@/components/features/History/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import NotFound from '@/components/common/UI/NotFound';
import Spinner from '@/components/common/UI/Spinner';
import VideoIcon from '@/assets/icons/video.svg';
import { useInfiniteQuery } from '@/hooks/query/infinite';
import { getHistories } from '@/store/features/history/history.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const History: NextPageWithLayout = () => {
  const { data, isFetchingMore, listRef, isLoading } = useInfiniteQuery(
    getHistories,
    { max: MAX }
  );

  return (
    <>
      <Head>
        <title>History</title>
      </Head>

      <HistoryHeader />
      <HistoryGrid items={data?.items || []} ref={listRef} />
      <SkeletonGrid on={isLoading} count={MAX} type="video" />
      <NotFound items={data?.items} label="History" icon={VideoIcon} />
      <Spinner on={isFetchingMore} size={64} />
    </>
  );
};

History.getLayout = function (page) {
  return <HistoryLayout>{page}</HistoryLayout>;
};

export default History;
