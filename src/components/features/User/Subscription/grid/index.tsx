import { forwardRef, useContext } from 'react';

import SubscriptionItem from '../Item';
import { ListContext, ListContextState as Ctx } from '@/context/List';
import { Channel } from '@/store/features/channel/channel.type';

const SubscriptionGrid = forwardRef<HTMLUListElement>(function SubscriptionGrid(
  {},
  ref
) {
  const { items } = useContext<Ctx<Channel>>(ListContext);

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6" ref={ref}>
      {items.map((item) => (
        <SubscriptionItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

export default SubscriptionGrid;
