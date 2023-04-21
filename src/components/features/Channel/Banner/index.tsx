import { useState } from 'react';

import Avatar from '@/components/common/UI/Avatar';
import Button from '@/components/common/Element/Button';
import VideoIcon from '@/assets/icons/video.svg';
import SubscribeUsersIcon from '@/assets/icons/subscribe-users.svg';
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '@/store/features/channel/channel.api';
import { useAppSelector } from '@/hooks/store';
import { Channel } from '@/store/features/channel/channel.type';

interface ChannelBannerProps {
  channel: Channel;
}

export default function ChannelBanner({ channel }: ChannelBannerProps) {
  const user = useAppSelector((state) => state.user.info);
  const [subscribed, setSubscribed] = useState(channel.subscribed);

  const [subscribe, { isLoading: subLoading }] = useSubscribeMutation();
  const [unsubscribe, { isLoading: unsubLoading }] = useUnsubscribeMutation();

  const subscribeHandler = async () => {
    subscribed
      ? await unsubscribe(channel.id).unwrap()
      : await subscribe(channel.id).unwrap();

    setSubscribed((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-6">
      <Avatar src={channel.picture} name={channel.name} size={96} />
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-2xl">{channel.name}</h3>
        <div className="flex items-center gap-4 font-medium">
          <div className="flex gap-2">
            <span className="w-6 h-6">
              <VideoIcon />
            </span>
            <span>{channel.videos}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-6 h-6">
              <SubscribeUsersIcon />
            </span>
            <span>{channel.subscribers}</span>
          </div>
        </div>
      </div>
      <div className="ml-auto">
        {user?.id !== channel.id ? (
          <Button
            small
            inversed
            loading={subLoading || unsubLoading}
            onClick={subscribeHandler}
          >
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
