import Head from 'next/head';

import BrowseLayout from '@/components/features/Browse/_layout';
import VideoGrid from '@/components/features/Video/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import NotFound from '@/components/common/UI/NotFound';
import Spinner from '@/components/common/UI/Spinner';
import VideoIcon from '@/assets/icons/video.svg';
import { VideoModalProvider } from '@/context/video-modal';
import { useInfiniteQuery } from '@/hooks/query/infinite';
import { getVideos } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const Browse: NextPageWithLayout = () => {
  const { data, error, isFetchingMore, listRef } = useInfiniteQuery(getVideos, {
    max: MAX,
  });

  return (
    <>
      <Head>
        <title>Browse</title>
      </Head>

      <VideoGrid
        label="Recent Videos"
        items={data?.items || []}
        ref={listRef}
      />
      <SkeletonGrid on={!data && !error} count={MAX} type="video" />
      <NotFound items={data?.items} label="Video" icon={VideoIcon} />
      <Spinner on={isFetchingMore} size={64} />
    </>
  );
};

Browse.getLayout = function (page) {
  return (
    <VideoModalProvider>
      <BrowseLayout>{page}</BrowseLayout>
    </VideoModalProvider>
  );
};

export default Browse;
