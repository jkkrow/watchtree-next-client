import Head from 'next/head';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import ChannelLayout from '@/components/features/Channel/_layout';
import ChannelBanner from '@/components/features/Channel/Banner';
import VideoGrid from '@/components/features/Video/Grid';
import ChannelSkeleton from '@/components/common/UI/Skeleton/Item/Channel';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import { VideoModalProvider } from '@/context/video-modal';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { useGetChannelQuery } from '@/store/features/channel/channel.api';
import { getChannelVideos } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';
import { useMemo } from 'react';

const MAX = 24;

const Channel: NextPageWithLayout = () => {
  const router = useRouter();

  const id = useMemo(() => {
    if (!router.isReady) return null;
    const id = router.query.id;

    return id instanceof Array ? id[0] : id;
  }, [router.isReady, router.query.id]);

  const { data: channelData, error: channelError } = useGetChannelQuery(
    id || skipToken
  );
  const { data, error, page } = usePaginationQuery(
    getChannelVideos,
    { id: id || '', max: MAX, withCount: true },
    { skip: !id }
  );

  return (
    <>
      {channelData ? (
        <Head>
          <title>{channelData.channel.name} - WatchTree</title>
        </Head>
      ) : null}

      {channelData ? <ChannelBanner channel={channelData.channel} /> : null}
      {!channelData && !channelError ? <ChannelSkeleton /> : null}
      <SkeletonGrid on={!data && !error} count={MAX} type="video" />
      <div>
        <VideoGrid label="Published Videos" items={data?.items} />
        <Pagination count={data?.count || 0} size={MAX} page={page} />
      </div>
    </>
  );
};

Channel.getLayout = function (page) {
  return (
    <VideoModalProvider>
      <ChannelLayout>{page}</ChannelLayout>;
    </VideoModalProvider>
  );
};

export default Channel;
