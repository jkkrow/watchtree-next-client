import { forwardRef, useContext } from 'react';

import VideoItem from '../Item';
import { ListContext, ListContextState as Ctx } from '@/context/List';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoGridProps {
  label?: string;
}

const VideoGrid = forwardRef<HTMLUListElement, VideoGridProps>(
  function VideoGrid({ label }, ref) {
    const { items } = useContext<Ctx<VideoTreeEntryWithData>>(ListContext);

    return (
      <div className="w-full">
        {label ? <h3 className="text-xl font-bold mb-4">{label}</h3> : null}
        <ul
          className="grid grid-cols-2 gap-2 md:grid-cols-video md:gap-6 w-full"
          ref={ref}
        >
          {items.map((item) => (
            <VideoItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    );
  }
);

export default VideoGrid;
