import { Fragment } from 'react';

import VideoGrid from '@/components/Video/Grid';
import Spinner from '@/components/common/UI/Spinner';
import { useGetVideosQuery } from '@/store/features/video/video.api';
import { useKeysetPagination } from '@/hooks/pagination';

export default function Browse() {
  const { ref, token } = useKeysetPagination(() => data);
  const { data, isFetching, isLoading } = useGetVideosQuery({ max: 30, token });

  return (
    <Fragment>
      {data && <VideoGrid videos={data.videoTrees} ref={ref} />}
      {!isLoading && isFetching && <Spinner />}
    </Fragment>
  );
}
