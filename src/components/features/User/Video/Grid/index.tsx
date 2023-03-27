import { forwardRef } from 'react';

import CreatedVideoItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface CreatedVideoGridProps {
  items: VideoTreeEntryWithData[];
}

const CreatedVideoGrid = forwardRef<HTMLUListElement, CreatedVideoGridProps>(
  function CreatedVideoGrid({ items }, ref) {
    return (
      <ul className="grid grid-cols-video w-full gap-6" ref={ref}>
        {items.map((item) => (
          <CreatedVideoItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }
);

export default CreatedVideoGrid;
