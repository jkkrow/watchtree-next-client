import Image from 'next/image';

import VideoIcon from '@/assets/icons/video.svg';

interface VideoThumbnailProps {
  title: string;
  url: string;
}

export default function VideoThumbnail({ title, url }: VideoThumbnailProps) {
  const assetDomain = process.env.NEXT_PUBLIC_ASSET_DOMAIN;
  const imgUrl =
    url.startsWith('http') || url.startsWith('blob')
      ? url
      : `${assetDomain}/${url}`;

  return (
    <div className="relative flex justify-center items-center cursor-pointer aspect-video">
      {url ? (
        <Image
          className="object-cover"
          src={imgUrl}
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
