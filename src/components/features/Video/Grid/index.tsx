import { forwardRef } from 'react';

import VideoItem from '../Item';
import NotFound from '@/components/common/UI/NotFound';
import VideoIcon from '@/assets/icons/video.svg';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoGridProps {
  label?: string;
  items: VideoTreeEntryWithData[] | undefined;
}

const VideoGrid = forwardRef<HTMLUListElement, VideoGridProps>(
  function VideoGrid({ label, items }, ref) {
    return items ? (
      <div className="w-full">
        {label ? <h3 className="text-xl font-bold mb-4">{label}</h3> : null}
        <ul
          className="grid grid-cols-2 md:grid-cols-video gap-6 w-full"
          ref={ref}
        >
          {items.map((item) => (
            <VideoItem key={item.id} item={item as VideoTreeEntryWithData} />
          ))}
        </ul>
        <NotFound label="Video" items={items} icon={VideoIcon} />
      </div>
    ) : null;
  }
);

export default VideoGrid;
