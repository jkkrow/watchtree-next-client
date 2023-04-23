import Skeleton from '@/components/common/UI/Skeleton';
import VideoDescription from '../../../UI/VideoDescription';
import VideoCategories from '../../../UI/VideoCategories';
import VideoTimestamps from '../../../UI/VideoTimestamps';
import { VideoTreeWithData } from '@/store/features/video/video.type';

interface DetailsProps {
  video: VideoTreeWithData | undefined;
  loading: boolean;
}

export default function Details({ video, loading }: DetailsProps) {
  return (
    <div className="overflow-hidden p-12">
      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="45%" />
        </div>
      ) : null}
      {video ? (
        <div className="flex flex-col justify-between md:flex-row gap-8 overflow-hidden">
          <VideoDescription
            text={(video as VideoTreeWithData).description}
            brief
          />
          <div className="flex flex-col justify-start flex-shrink-0 w-full md:w-[300px] max-w-full gap-8">
            <VideoCategories categories={video.categories} />
            <div>
              <VideoTimestamps label="Created at" timestamp={video.createdAt} />
              <VideoTimestamps label="Updated at" timestamp={video.updatedAt} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
