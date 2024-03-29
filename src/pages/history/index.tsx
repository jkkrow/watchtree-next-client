import Head from 'next/head';

import HistoryLayout from '@/components/features/History/_layout';
import HistoryHeader from '@/components/features/History/Header';
import HistoryGrid from '@/components/features/History/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Spinner from '@/components/common/UI/Spinner';
import { VideoModalProvider } from '@/context/video-modal';
import { useInfiniteQuery } from '@/hooks/query/infinite';
import { getHistories } from '@/store/features/history/history.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const History: NextPageWithLayout = () => {
  const { data, error, isFetchingMore, originalArgs, listRef } =
    useInfiniteQuery(getHistories, { max: MAX });

  return (
    <>
      <Head>
        <title>History - WatchTree</title>
      </Head>

      <HistoryHeader params={originalArgs} />
      <SkeletonGrid on={!data && !error} count={MAX} type="video" />
      <HistoryGrid items={data?.items} ref={listRef} />
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
