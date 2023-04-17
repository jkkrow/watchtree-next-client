import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import VideoLayout from '@/components/features/Video/_layout';
import VideoTree from '@/components/features/Video/TreeView/Tree';
import { useWatchVideoQuery } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';

const Video: NextPageWithLayout = () => {
  const router = useRouter();

  const id = useMemo(() => router.query.id || '', [router.query.id]);
  const arg = id instanceof Array ? id[0] : id;

  const { data } = useWatchVideoQuery(arg, {
    skip: !id,
  });

  const video = data;

  return (
    <>
      {video ? (
        <Head>
          <title>{video.videoTree.title}</title>
        </Head>
      ) : null}

      {video ? (
        <VideoTree tree={video.videoTree} history={video.videoTree.history} />
      ) : null}
    </>
  );
};

Video.getLayout = function (page) {
  return <VideoLayout>{page}</VideoLayout>;
};

export default Video;
