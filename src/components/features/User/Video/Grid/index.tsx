import { AnimatePresence } from 'framer-motion';
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
});

export default CreatedVideoGrid;
