import Head from 'next/head';
import { ReactElement } from 'react';

import UserLayout from '@/components/features/User/_layout';
import CreatedVideoHeader from '@/components/features/User/Video/Header/index.';
import CreatedVideoGrid from '@/components/features/User/Video/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import { ListContextProvider } from '@/context/List';
import { useAppSelector } from '@/hooks/store';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { getCreatedVideos } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';

const MAX = 24;

const CreatedVideos: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user.info);
  const { data, originalArgs, page } = usePaginationQuery(
    getCreatedVideos,
    { max: MAX, withCount: true },
    { skip: !user }
  );

  return (
    <>
      <Head>
        <title>My Videos</title>
      </Head>

      <CreatedVideoHeader params={originalArgs} />
      <ListContextProvider items={data?.items || []}>
        <CreatedVideoGrid />
      </ListContextProvider>
      <SkeletonGrid on={!data} count={MAX} type="video" />
      <Pagination count={data?.count || 0} size={MAX} page={page} />
    </>
  );
};

CreatedVideos.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default CreatedVideos;
