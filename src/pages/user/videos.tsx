import Head from 'next/head';

import UserLayout from '@/components/features/User/_layout';
import CreatedVideoHeader from '@/components/features/User/Video/Header/index.';
import CreatedVideoGrid from '@/components/features/User/Video/Grid';
import Pagination from '@/components/common/UI/Pagination';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { getCreatedVideos } from '@/store/features/video/video.api';

export default function CreatedVideos() {
  const params = { max: 24, withCount: true };
  const { data, originalArgs, page } = usePaginationQuery(
    getCreatedVideos,
    params
  );

  return (
    <>
      <Head>
        <title>My Videos</title>
      </Head>
      <UserLayout>
        <CreatedVideoHeader params={originalArgs} />
        <CreatedVideoGrid items={data?.items || []} />
        <Pagination count={data?.count || 0} size={params.max} page={page} />
      </UserLayout>
    </>
  );
}
