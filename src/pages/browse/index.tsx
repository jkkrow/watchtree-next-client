import VideoGrid from '@/components/Video/Grid';
import Spinner from '@/components/common/UI/Spinner';
import { useInfiniteQuery } from '@/hooks/query';
import { getVideos } from '@/store/features/video/video.api';

export default function Browse() {
  const { data, isFetchingMore, listRef } = useInfiniteQuery(getVideos, {
    max: 10,
  });

  return (
    <>
      <VideoGrid data={data} ref={listRef} />
      <Spinner on={isFetchingMore} size={64} />
    </>
  );
}
