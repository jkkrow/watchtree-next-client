import { forwardRef } from 'react';

import VideoItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoGridProps {
  label?: string;
  items: VideoTreeEntryWithData[];
}

const VideoGrid = forwardRef<HTMLUListElement, VideoGridProps>(
  function VideoGrid({ label, items }, ref) {
    return (
      <div className="w-full">
        {label ? <h3 className="text-xl font-bold mb-4">{label}</h3> : null}
        <ul className="grid grid-cols-video w-full gap-6" ref={ref}>
          {items.map((item) => (
            <VideoItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    );
  }
);

export default VideoGrid;
