import { AnimatePresence } from 'framer-motion';
import { forwardRef, PropsWithChildren } from 'react';

import VideoItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoGridProps {
  videos: VideoTreeEntryWithData[];
}

const VideoGrid = forwardRef<
  HTMLUListElement,
  PropsWithChildren<VideoGridProps>
>(function VideoGrid({ videos }, ref) {
  return (
    <div>
      <ul ref={ref} className="grid grid-cols-video gap-6 p-6">
        <AnimatePresence>
          {videos.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
});

export default VideoGrid;
