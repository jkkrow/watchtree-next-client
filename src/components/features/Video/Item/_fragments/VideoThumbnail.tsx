import Image from 'next/image';

import VideoIcon from '@/assets/icons/video.svg';
import { getImageUrl } from '@/utils/image';

interface VideoThumbnailProps {
  title: string;
  url: string;
}

export default function VideoThumbnail({ title, url }: VideoThumbnailProps) {
  return (
    <div className="relative flex justify-center items-center cursor-pointer aspect-video">
      {url ? (
        <Image
          className="object-cover"
          src={getImageUrl(url)}
          alt={title}
          sizes="320px"
          fill
          priority
        />
      ) : (
        <VideoIcon className="w-2/3 h-2/3" />
      )}
    </div>
  );
}
