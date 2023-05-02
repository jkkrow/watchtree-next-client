import Head from 'next/head';

import BrowseLayout from '@/components/features/Browse/_layout';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import CarouselSkeleton from '@/components/common/UI/Skeleton/Item/Carousel';
import VideoCarousel from '@/components/features/Video/Carousel';
import VideoSlide from '@/components/features/Video/Slide';
import { VideoModalProvider } from '@/context/video-modal';
import { useAppSelector } from '@/hooks/store';
import { useGetRecentVideosQuery } from '@/store/features/video/video.api';
import { useGetRecentHistoriesQuery } from '@/store/features/history/history.api';
import { useGetFavoritesQuery } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';

const MAX = 12;

const Featured: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user.info);

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
  const { data: favoriteData, error: favoriteError } = useGetFavoritesQuery(
    {
      max: MAX,
      page: 1,
    },
    { skip: !user }
  );

  const loading =
    (!recentData && !recentError) ||
    (!historyData && !historyError) ||
    (user ? !favoriteData && !favoriteError : false);

  return (
    <>
      <Head>
        <title>Featured Videos - WatchTree</title>
      </Head>

      {loading ? <CarouselSkeleton /> : null}
      <SkeletonGrid on={loading} count={MAX} type="video" />
      {!loading ? (
        <>
          <VideoCarousel items={recentData?.items.slice(0, 5)} />
          <VideoSlide
            label="Continue to Watch"
            to="/history"
            items={historyData?.items}
          />
          <VideoSlide
            label="Recent Videos"
            to="/browse/recent"
            items={recentData?.items}
          />
          <VideoSlide
            label="Favorite Videos"
            to="/user/favorites"
            items={favoriteData?.items}
          />
        </>
      ) : null}
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
