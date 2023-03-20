import { AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';

import CreatedVideoItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface CreatedVideoGridProps {
  items: VideoTreeEntryWithData[];
}

const CreatedVideoGrid = forwardRef<HTMLUListElement, CreatedVideoGridProps>(
  function CreatedVideoGrid({ items }, ref) {
    return (
      <div className="w-full">
        <ul className="grid grid-cols-video gap-6" ref={ref}>
          <AnimatePresence>
            {items.map((item) => (
              <CreatedVideoItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    );
  }
);

export default CreatedVideoGrid;
