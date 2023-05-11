import VideoThumbnail from '../../../UI/VideoThumbnail';
import VideoTitle from '../../../UI/VideoTitle';
import VideoDuration from '../../../UI/VideoDuration';
import VideoViews from '../../../UI/VideoViews';
import VideoFavorites from '../../../UI/VideoFavorites';
import VideoCreator from '../../../UI/VideoCreator';
import VideoHistory from '../../../UI/VideoHistory';
import PlayIcon from '@/assets/icons/play.svg';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface OverviewProps {
  video: VideoTreeEntryWithData;
  onWatch: (nodeId?: string) => () => void;
}

export default function Overview({ video, onWatch }: OverviewProps) {
  return (
    <>
      <div className="absolute top-0 right-0 w-[800px] max-w-full">
        <VideoThumbnail
          title={video.title}
          url={video.thumbnail}
          fallback={video.defaultThumbnail}
          large
        />
        <div className="absolute inset-0 bg-gradient-to-r via-transparent from-neutral-900" />
        <div className="absolute inset-0 bg-gradient-to-t via-transparent from-neutral-900" />
        <div className="absolute inset-0 bg-neutral-900/30" />
      </div>

      <div className="relative flex flex-col p-12 gap-4">
        <div className="w-[500px] max-w-full">
          <VideoTitle title={video.title} large />
        </div>
        <VideoDuration max={video.maxDuration} min={video.minDuration} brief />
        <div className="flex gap-4">
          <VideoViews count={video.views} />
          <VideoFavorites
            id={video.id}
            count={video.favorites}
            active={video.favorited}
          />
        </div>
        <VideoCreator creator={video.creator} />
        <div className="relative">
          <button
            className="flex items-center w-max my-10 gap-4 transition-opacity hover:opacity-70"
            onClick={onWatch()}
          >
            <div className="w-12 h-12 p-4 bg-neutral-100 text-neutral-900 rounded-full">
              <PlayIcon />
            </div>
            <div className="text-xl font-bold">
              {video.history
                ? video.history.ended
                  ? 'Replay from start'
                  : 'Continue to watch'
                : 'Watch now'}
            </div>
          </button>
          <div className="absolute bottom-0 left-0 w-64 max-w-full">
            <VideoHistory
              max={video.maxDuration}
              progress={video.history?.totalProgress}
              ended={video.history?.ended}
            />
          </div>
        </div>
      </div>
    </>
  );
}
