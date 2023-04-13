import Image from 'next/image';

import VideoIcon from '@/assets/icons/video.svg';
import { getImageUrl } from '@/utils/image';

interface VideoThumbnailProps {
  title: string;
  url: string;
  large?: boolean;
  preload?: boolean;
}

export default function VideoThumbnail({
  title,
  url,
  large,
  preload = true,
}: VideoThumbnailProps) {
  return (
    <div className="relative flex justify-center items-center aspect-video">
      {url ? (
        <Image
          className="object-cover"
          src={getImageUrl(url)}
          alt={title}
          sizes={large ? '960px' : '320px'}
          fill
          priority={preload}
        />
      ) : (
        <VideoIcon className="w-2/3 h-2/3" />
      )}
    </div>
  );
}
