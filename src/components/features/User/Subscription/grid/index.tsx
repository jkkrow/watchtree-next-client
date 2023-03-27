import { forwardRef } from 'react';

import SubscriptionItem from '../Item';
import { Channel } from '@/store/features/channel/channel.type';

interface SubscriptionGridProps {
  items: Channel[];
}

const SubscriptionGrid = forwardRef<HTMLUListElement, SubscriptionGridProps>(
  function SubscriptionGrid({ items }, ref) {
    return (
      <ul className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6" ref={ref}>
        {items.map((item) => (
          <SubscriptionItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }
);

export default SubscriptionGrid;
