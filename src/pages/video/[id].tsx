import Head from 'next/head';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import VideoLayout from '@/components/features/Video/_layout';
import VideoTree from '@/components/features/Video/TreeView/Tree';
import Loader from '@/components/common/UI/Loader';
import { useWatchVideoQuery } from '@/store/features/video/video.api';
import { NextPageWithLayout } from '../_app';

const Video: NextPageWithLayout = () => {
  const router = useRouter();

  const launchParams = useMemo(() => {
    if (!router.isReady || !router.query.id) return null;
    const { id, nodeId, progress } = router.query;

    return {
      id: id instanceof Array ? id[0] : id,
      nodeId: nodeId instanceof Array ? nodeId[0] : nodeId,
      progress: progress instanceof Array ? +progress[0] : +(progress || 0),
    };
  }, [router.isReady, router.query]);

  const { data, error } = useWatchVideoQuery(launchParams?.id || skipToken);

  return (
    <>
      {data ? (
        <Head>
          <title>{data.videoTree.title} - WatchTree</title>
        </Head>
      ) : null}

      <Loader on={!data && !error} position="top" overlay />
      {data && launchParams ? (
        <VideoTree
          tree={data.videoTree}
          initialNodeId={launchParams.nodeId}
          initialProgress={launchParams.progress}
        />
      ) : null}
    </>
  );
};

Video.getLayout = function (page) {
  return <VideoLayout>{page}</VideoLayout>;
};

export default Video;
