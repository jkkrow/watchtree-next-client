import Link from 'next/link';

import Avatar from '@/components/common/UI/Avatar';
import { VideoTreeCreator } from '@/store/features/video/video.type';

interface VideoCreatorProps {
  creator: VideoTreeCreator;
  brief?: boolean;
}

export default function VideoCreator({ creator, brief }: VideoCreatorProps) {
  const creatorName = (
    <div className="font-semibold line-clamp-1">{creator.name}</div>
  );

  return (
    <Link
      className="flex items-center w-fit max-w-full"
      href={`/channels/${creator.id}`}
    >
      <div className="group relative flex items-center pr-2">
        <Avatar
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${creator.picture}`}
          name={creator.name}
          width={24}
          height={24}
        />
        {brief && (
          <div className="absolute px-2 py-1 ml-6 rounded-md pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-x-2 transition bg-inversed text-inversed">
            {creatorName}
          </div>
        )}
      </div>
      {!brief && creatorName}
    </Link>
  );
}
