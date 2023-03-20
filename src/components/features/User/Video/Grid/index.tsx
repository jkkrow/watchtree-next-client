import { AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';

import CreatedVideoItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface CreatedVideoGridProps {
  label?: string;
  items: VideoTreeEntryWithData[];
}

const CreatedVideoGrid = forwardRef<HTMLUListElement, CreatedVideoGridProps>(
  function CreatedVideoGrid({ label, items }, ref) {
    return (
      <div className="w-full">
        {label ? <h3 className="mb-4">{label}</h3> : null}
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
