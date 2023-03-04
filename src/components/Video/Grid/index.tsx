import { AnimatePresence } from 'framer-motion';
import { forwardRef, PropsWithChildren } from 'react';

import VideoItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoGridProps {
  data: { items: VideoTreeEntryWithData[] } | undefined;
}

const VideoGrid = forwardRef<
  HTMLUListElement,
  PropsWithChildren<VideoGridProps>
>(function VideoGrid({ data }, ref) {
  return (
    <div>
      <ul ref={ref} className="grid grid-cols-video gap-6 p-6">
        <AnimatePresence>
          {data
            ? data.items.map((video) => (
                <VideoItem key={video.id} video={video} />
              ))
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
});

export default VideoGrid;
