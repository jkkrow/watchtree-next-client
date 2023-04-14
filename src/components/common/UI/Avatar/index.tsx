import Image from 'next/image';
import UserIcon from '@/assets/icons/user.svg';

import { getImageUrl } from '@/utils/image';

interface AvatarProps {
  src: string;
  name?: string;
  size: number;
}

export default function Avatar({ src, name, size }: AvatarProps) {
  const sizeInRem = size / 16;

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: `${sizeInRem}rem`, height: `${sizeInRem}rem` }}
    >
      {src ? (
        <Image
          className="object-cover"
          src={getImageUrl(src)}
          alt={name || ''}
          fill
          sizes={`${size}px`}
          priority={size > 64}
        />
      ) : (
        <UserIcon width={`${sizeInRem}rem`} height={`${sizeInRem}rem`} />
      )}
    </div>
  );
}
