import { forwardRef } from 'react';

import UserVideoItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface UserVideoGridProps {
  items: VideoTreeEntryWithData[];
}

const UserVideoGrid = forwardRef<HTMLUListElement, UserVideoGridProps>(
  function UserVideoGrid({ items }, ref) {
    return (
      <ul className="grid grid-cols-video w-full gap-6" ref={ref}>
        {items.map((item) => (
          <UserVideoItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }
);

export default UserVideoGrid;
