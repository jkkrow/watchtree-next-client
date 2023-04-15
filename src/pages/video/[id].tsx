import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import VideoLayout from '@/components/features/Video/_layout';
import { useGetVideoQuery } from '@/store/features/video/video.api';
import { useMemo } from 'react';

export default function Video() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const id = useMemo(() => router.query.id || '', [router.query.id]);
  const { data } = useGetVideoQuery(id instanceof Array ? id[0] : id, {
    skip: !router.isReady,
  });

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* {data ? (
        <Head>
          <title>{data.videoTree.title}</title>
        </Head>
      ) : null} */}

      <VideoLayout></VideoLayout>
    </>
  );
}
