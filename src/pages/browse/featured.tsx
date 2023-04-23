import Head from 'next/head';

import BrowseLayout from '@/components/features/Browse/_layout';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Skeleton from '@/components/common/UI/Skeleton';
import { VideoModalProvider } from '@/context/video-modal';
import { useGetRecentVideosQuery } from '@/store/features/video/video.api';
import { useGetRecentHistoriesQuery } from '@/store/features/history/history.api';
import { useGetFavoritesQuery } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';
import VideoCarousel from '@/components/features/Video/Carousel';

const MAX = 12;

const Featured: NextPageWithLayout = () => {
  const { data: recentData, error: recentError } = useGetRecentVideosQuery({
    max: MAX,
    page: 1,
  });
  const { data: historyData, error: historyError } = useGetRecentHistoriesQuery(
    {
      max: MAX,
      token: null,
      skipEnded: true,
    }
  );
  const { data: favoriteData, error: favoriteError } = useGetFavoritesQuery({
    max: MAX,
    page: 1,
  });

  return (
    <>
      <Head>
        <title>Featured Videos - WatchTree</title>
      </Head>

      {!recentData && !recentError ? <Skeleton variant="rectangular" /> : null}
      <VideoCarousel items={recentData?.items.slice(0, 5)} />

      {/* <SkeletonGrid on={!data && !error} count={MAX} type="video" /> */}
    </>
  );
};

Featured.getLayout = function (page) {
  return (
    <VideoModalProvider>
      <BrowseLayout>{page}</BrowseLayout>
    </VideoModalProvider>
  );
};

export default Featured;
