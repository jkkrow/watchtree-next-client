import VideoGrid from '@/components/Video/Grid';
import Spinner from '@/components/common/UI/Spinner';
import { useInfiniteQuery } from '@/hooks/pagination';
import { getVideos } from '@/store/features/video/video.api';

export default function Browse() {
  const { listRef, data, refetch } = useInfiniteQuery(getVideos, { max: 4 });

  return (
    <>
      <div>
        <button onClick={refetch}>Refetch</button>
      </div>
      <VideoGrid data={data} ref={listRef} />
      {/* {!isLoading && isFetching && <Spinner />} */}
    </>
  );
}
