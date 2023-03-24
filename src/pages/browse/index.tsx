import BrowseLayout from '@/components/features/Browse/_layout';
import VideoGrid from '@/components/features/Video/Grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import NotFound from '@/components/common/UI/NotFound';
import Spinner from '@/components/common/UI/Spinner';
import VideoIcon from '@/assets/icons/video.svg';
import { ListContextProvider } from '@/context/List';
import { useInfiniteQuery } from '@/hooks/query/infinite';
import { getVideos } from '@/store/features/video/video.api';

const MAX = 30;

export default function Browse() {
  const { data, isFetchingMore, listRef, isLoading } = useInfiniteQuery(
    getVideos,
    { max: MAX }
  );

  return (
    <>
      <BrowseLayout>
        <ListContextProvider items={data?.items || []}>
          <VideoGrid label="Recent Videos" ref={listRef} />
        </ListContextProvider>
        <SkeletonGrid on={isLoading} count={MAX} type="video" />
        <NotFound items={data?.items} label="Video" icon={VideoIcon} />
        <Spinner on={isFetchingMore} size={64} />
      </BrowseLayout>
    </>
  );
}
