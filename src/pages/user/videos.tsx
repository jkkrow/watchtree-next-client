import Head from 'next/head';

import UserLayout from '@/components/features/User/_layout';
import UserVideoHeader from '@/components/features/User/Video/Header';
import UserVideoGrid from '@/components/features/User/Video/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import NotFound from '@/components/common/UI/NotFound';
import VideoIcon from '@/assets/icons/video.svg';
import { useAppSelector } from '@/hooks/store';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { getCreatedVideos } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';

const MAX = 24;

const UserVideos: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user.info);
  const { data, originalArgs, page, isLoading } = usePaginationQuery(
    getCreatedVideos,
    { max: MAX, withCount: true },
    { skip: !user }
  );

  return (
    <>
      <Head>
        <title>My Videos</title>
      </Head>

      <UserVideoHeader params={originalArgs} />
      <UserVideoGrid items={data?.items || []} />
      <SkeletonGrid on={isLoading} count={MAX} type="video" />
      <NotFound items={data?.items} label="Video" icon={VideoIcon} />
      <Pagination count={data?.count || 0} size={MAX} page={page} />
    </>
  );
};

UserVideos.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};

export default UserVideos;
