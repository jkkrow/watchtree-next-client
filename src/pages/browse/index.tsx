import BrowseLayout from '@/components/features/Browse/_layout';
import VideoGrid from '@/components/features/Video/Grid';
import Spinner from '@/components/common/UI/Spinner';
import { useInfiniteQuery } from '@/hooks/query/infinite';
import { getVideos } from '@/store/features/video/video.api';

const MAX = 30;

export default function Browse() {
  const { data, isFetchingMore, listRef } = useInfiniteQuery(getVideos, {
    max: MAX,
  });

  return (
    <>
      <BrowseLayout>
        <VideoGrid items={data?.items || []} ref={listRef} />
        <Spinner on={isFetchingMore} size={64} />
      </BrowseLayout>
    </>
  );
}
