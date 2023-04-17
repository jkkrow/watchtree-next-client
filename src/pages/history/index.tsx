import Head from 'next/head';

import HistoryLayout from '@/components/features/History/_layout';
import HistoryHeader from '@/components/features/History/Header';
import HistoryGrid from '@/components/features/History/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import NotFound from '@/components/common/UI/NotFound';
import Spinner from '@/components/common/UI/Spinner';
import HistoryIcon from '@/assets/icons/history.svg';
import { VideoModalProvider } from '@/context/video-modal';
import { useInfiniteQuery } from '@/hooks/query/infinite';
import { getHistories } from '@/store/features/history/history.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const History: NextPageWithLayout = () => {
  const { data, error, isFetchingMore, listRef } = useInfiniteQuery(
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
      <SkeletonGrid on={!data && !error} count={MAX} type="video" />
      <NotFound items={data?.items} label="History" icon={HistoryIcon} />
      <Spinner on={isFetchingMore} size={64} />
    </>
  );
};

History.getLayout = function (page) {
  return (
    <VideoModalProvider>
      <HistoryLayout>{page}</HistoryLayout>
    </VideoModalProvider>
  );
};

export default History;
