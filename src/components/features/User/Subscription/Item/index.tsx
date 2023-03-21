import Link from 'next/link';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';

import Avatar from '@/components/common/UI/Avatar';
import Button from '@/components/common/Element/Button';
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '@/store/features/channel/channel.api';
import { ListContext } from '@/context/List';
import { opacityVariants } from '@/constants/variants';
import { Channel } from '@/store/features/channel/channel.type';

interface SubscriptionItemProps {
  item: Channel;
}

export default function SubscriptionItem({ item }: SubscriptionItemProps) {
  const { label, filterItems } = useContext(ListContext);
  const [subscribed, setSubscribed] = useState(item.subscribed);

  const [subscribe, { isLoading: subLoading }] = useSubscribeMutation();
  const [unsubscribe, { isLoading: unsubLoading }] = useUnsubscribeMutation();

  const subscribeHandler = async () => {
    const result: any = subscribed
      ? await unsubscribe(item.id)
      : await subscribe(item.id);

    if (result.error) {
      return;
    }

    if (label === 'subscribers') {
      setSubscribed((prev) => !prev);
    }

    if (label === 'subscribes') {
      filterItems(item.id);
    }
  };

  return (
    <motion.li
      className="flex justify-between w-full p-4 gap-8 hover:text-hover transition-colors"
      variants={opacityVariants}
      initial="inActive"
      animate="active"
      exit="inActive"
      layout
    >
      <Link
        className="flex items-center gap-4 overflow-hidden"
        href={`channel/${item.id}`}
      >
        <Avatar src={item.picture} size={40} />
        <div className="flex-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {item.name}
        </div>
      </Link>
      <div className="w-36 flex-grow-0 flex-shrink-0">
        <Button
          inversed
          loading={subLoading || unsubLoading}
          onClick={subscribeHandler}
        >
          {subscribed ? 'Unsubscribe' : 'Subscribe'}
        </Button>
      </div>
    </motion.li>
  );
}
