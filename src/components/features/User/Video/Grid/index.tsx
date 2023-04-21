import { forwardRef } from 'react';

import UserVideoItem from '../Item';
import NotFound from '@/components/common/UI/NotFound';
import VideoIcon from '@/assets/icons/video.svg';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface UserVideoGridProps {
  items: VideoTreeEntryWithData[] | undefined;
}

const UserVideoGrid = forwardRef<HTMLUListElement, UserVideoGridProps>(
  function UserVideoGrid({ items }, ref) {
    return items ? (
      <div className="w-full">
        <ul
          className="grid grid-cols-2 md:grid-cols-video w-full gap-6"
          ref={ref}
        >
          {items.map((item) => (
            <UserVideoItem key={item.id} item={item} />
          ))}
        </ul>
        <NotFound label="Video" items={items} icon={VideoIcon} />
      </div>
    ) : null;
  }
);

export default UserVideoGrid;
