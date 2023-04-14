import { forwardRef } from 'react';

import HistoryItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface HistoryGridProps {
  items: VideoTreeEntryWithData[];
}

const HistoryGrid = forwardRef<HTMLUListElement, HistoryGridProps>(
  function HistoryGrid({ items }, ref) {
    return (
      <ul
        className="grid grid-cols-2 md:grid-cols-video gap-6 w-full"
        ref={ref}
      >
        {items.map((item) => (
          <HistoryItem key={item.id} item={item as VideoTreeEntryWithData} />
        ))}
      </ul>
    );
  }
);
export default HistoryGrid;
