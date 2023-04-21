import { forwardRef } from 'react';

import HistoryItem from '../Item';
import NotFound from '@/components/common/UI/NotFound';
import HistoryIcon from '@/assets/icons/history.svg';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface HistoryGridProps {
  items: VideoTreeEntryWithData[] | undefined;
}

const HistoryGrid = forwardRef<HTMLUListElement, HistoryGridProps>(
  function HistoryGrid({ items }, ref) {
    return items ? (
      <div className="w-full">
        <ul
          className="grid grid-cols-2 md:grid-cols-video gap-6 w-full"
          ref={ref}
        >
          {items.map((item) => (
            <HistoryItem key={item.id} item={item as VideoTreeEntryWithData} />
          ))}
        </ul>
        <NotFound label="History" items={items} icon={HistoryIcon} />
      </div>
    ) : null;
  }
);
export default HistoryGrid;
