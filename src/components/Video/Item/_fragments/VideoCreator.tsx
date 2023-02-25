import Link from 'next/link';

import Avatar from '@/components/common/UI/Avatar';
import { VideoTreeCreator } from '@/store/features/video/video.type';

interface VideoCreatorProps {
  creator: VideoTreeCreator;
}

export default function VideoCreator({ creator }: VideoCreatorProps) {
  return (
    <Link
      className="flex items-center w-fit max-w-full gap-2"
      href={`/channels/${creator.id}`}
    >
      <Avatar
        src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${creator.picture}`}
        name={creator.name}
        width={24}
        height={24}
      />
      {/* <div className="font-semibold line-clamp-1">{creator.name}</div> */}
    </Link>
  );
}
