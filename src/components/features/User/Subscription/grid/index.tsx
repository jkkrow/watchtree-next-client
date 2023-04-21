import { forwardRef } from 'react';

import SubscriptionItem from '../Item';
import NotFound from '@/components/common/UI/NotFound';
import SubscribeUsersIcon from '@/assets/icons/subscribe-users.svg';
import { Channel } from '@/store/features/channel/channel.type';

interface SubscriptionGridProps {
  items: Channel[] | undefined;
}

const SubscriptionGrid = forwardRef<HTMLUListElement, SubscriptionGridProps>(
  function SubscriptionGrid({ items }, ref) {
    return items ? (
      <div className="w-full">
        <ul className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6" ref={ref}>
          {items.map((item) => (
            <SubscriptionItem key={item.id} item={item} />
          ))}
        </ul>
        <NotFound label="Subscriber" items={items} icon={SubscribeUsersIcon} />
      </div>
    ) : null;
  }
);

export default SubscriptionGrid;
