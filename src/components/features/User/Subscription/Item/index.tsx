import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

import Avatar from '@/components/common/UI/Avatar';
import Button from '@/components/common/Element/Button';
import VideoIcon from '@/assets/icons/video.svg';
import SubscribeUsersIcon from '@/assets/icons/subscribe-users.svg';
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '@/store/features/channel/channel.api';
import { Channel } from '@/store/features/channel/channel.type';

interface SubscriptionItemProps {
  item: Channel;
}

export default function SubscriptionItem({ item }: SubscriptionItemProps) {
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

    setSubscribed((prev) => !prev);
  };

  return (
    <motion.li
      className="flex justify-between w-full p-4 gap-8"
      layoutId={item.id}
    >
      <Link
        className="flex items-center gap-4 overflow-hidden hover:text-hover transition-colors"
        href={`/channel/${item.id}`}
      >
        <Avatar src={item.picture} size={40} />
        <div className="flex flex-col flex-1 gap-1 overflow-hidden">
          <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {item.name}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-4 h-4">
              <VideoIcon />
            </span>
            <span>{item.videos}</span>
            <span className="w-4 h-4">
              <SubscribeUsersIcon />
            </span>
            <span>{item.subscribers}</span>
          </div>
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
