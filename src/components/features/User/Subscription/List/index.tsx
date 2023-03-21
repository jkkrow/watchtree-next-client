import { forwardRef, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';

import SubscriptionItem from '../Item';
import { ListContext, ListContextState as Ctx } from '@/context/List';
import { Channel } from '@/store/features/channel/channel.type';

const SubscriptionList = forwardRef<HTMLUListElement>(function SubscriptionList(
  {},
  ref
) {
  const { items } = useContext<Ctx<Channel>>(ListContext);

  return (
    <ul
      className="grid grid-cols-1 max-w-md lg:grid-cols-2 lg:max-w-5xl w-full gap-x-8 gap-y-4"
      ref={ref}
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <SubscriptionItem key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </ul>
  );
});

export default SubscriptionList;
