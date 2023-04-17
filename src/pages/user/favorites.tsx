import Head from 'next/head';

import UserLayout from '@/components/features/User/_layout';
import VideoGrid from '@/components/features/Video/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import NotFound from '@/components/common/UI/NotFound';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import { VideoModalProvider } from '@/context/video-modal';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { getFavorites } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const Favorites: NextPageWithLayout = () => {
  const { data, error, page } = usePaginationQuery(getFavorites, {
    max: MAX,
    withCount: true,
  });

  return (
    <>
      <Head>
        <title>Favorites</title>
      </Head>

      <VideoGrid label="Favorite Videos" items={data?.items || []} />
      <SkeletonGrid on={!data && !error} count={MAX} type="video" />
      <NotFound items={data?.items} label="Favorites" icon={FavoriteIcon} />
      <Pagination count={data?.count || 0} size={MAX} page={page} />
    </>
  );
};

Favorites.getLayout = function getLayout(page) {
  return (
    <VideoModalProvider>
      <UserLayout>{page}</UserLayout>
    </VideoModalProvider>
  );
};

export default Favorites;
