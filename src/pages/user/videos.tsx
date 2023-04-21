import Head from 'next/head';

import UserLayout from '@/components/features/User/_layout';
import UserVideoHeader from '@/components/features/User/Video/Header';
import UserVideoGrid from '@/components/features/User/Video/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import { VideoModalProvider } from '@/context/video-modal';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { getCreatedVideos } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';

const MAX = 24;

const UserVideos: NextPageWithLayout = () => {
  const { data, error, originalArgs, page } = usePaginationQuery(
    getCreatedVideos,
    { max: MAX, withCount: true }
  );

  return (
    <>
      <Head>
        <title>My Videos - WatchTree</title>
      </Head>

      <UserVideoHeader params={originalArgs} />
      <SkeletonGrid on={!data && !error} count={MAX} type="video" />
      <UserVideoGrid items={data?.items} />
      <Pagination count={data?.count || 0} size={MAX} page={page} />
    </>
  );
};

UserVideos.getLayout = function getLayout(page) {
  return (
    <VideoModalProvider>
      <UserLayout>{page}</UserLayout>
    </VideoModalProvider>
  );
};

export default UserVideos;
