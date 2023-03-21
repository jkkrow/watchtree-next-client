import { forwardRef, useContext } from 'react';

import CreatedVideoItem from '../Item';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { ListContext, ListContextState as Ctx } from '@/context/List';

const CreatedVideoGrid = forwardRef<HTMLUListElement>(function CreatedVideoGrid(
  {},
  ref
) {
  const { items } = useContext<Ctx<VideoTreeEntryWithData>>(ListContext);

  return (
    <ul className="grid grid-cols-video w-full gap-6" ref={ref}>
      {items.map((item) => (
        <CreatedVideoItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

export default CreatedVideoGrid;
