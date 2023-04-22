import Head from 'next/head';
import { useRouter } from 'next/router';

import BrowseLayout from '@/components/features/Browse/_layout';
import VideoGrid from '@/components/features/Video/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import { VideoModalProvider } from '@/context/video-modal';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { searchVideos } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';
import { useMemo } from 'react';

const MAX = 24;

const Search: NextPageWithLayout = () => {
  const router = useRouter();

  const keyword = useMemo(() => {
    if (!router.isReady) return;
    const keyword = router.query.keyword;
    return keyword instanceof Array ? keyword[0] : keyword;
  }, [router.isReady, router.query.keyword]);

  const { data, error, page } = usePaginationQuery(
    searchVideos,
    {
      max: MAX,
      keyword: keyword || '',
      withCount: true,
    },
    { skip: !keyword }
  );

  return (
    <>
      <Head>
        <title>Search - WatchTree</title>
      </Head>

      <SkeletonGrid on={!data && !error} count={MAX} type="video" />
      <VideoGrid label={`#${keyword}`} items={data?.items} />
      <Pagination count={data?.count || 0} size={MAX} page={page} />
    </>
  );
};

Search.getLayout = function (page) {
  return (
    <VideoModalProvider>
      <BrowseLayout>{page}</BrowseLayout>
    </VideoModalProvider>
  );
};

export default Search;
