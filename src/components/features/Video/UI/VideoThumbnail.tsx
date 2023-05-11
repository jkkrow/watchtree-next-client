import Image from 'next/image';

import VideoIcon from '@/assets/icons/video.svg';
import { getImageUrl } from '@/utils/image';

interface VideoThumbnailProps {
  title: string;
  url: string;
  fallback?: string;
  large?: boolean;
  preload?: boolean;
}

export default function VideoThumbnail({
  title,
  url,
  fallback,
  large,
  preload = true,
}: VideoThumbnailProps) {
  const src = url || fallback;

  return (
    <div className="relative flex justify-center items-center aspect-video">
      {src ? (
        <Image
          className="object-cover"
          src={getImageUrl(src)}
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
