import Image from 'next/image';
import UserIcon from '@/assets/icons/user.svg';

import { getImageUrl } from '@/utils/image';

interface AvatarProps {
  src: string;
  name?: string;
  size: number;
}

export default function Avatar({ src, name, size }: AvatarProps) {
  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          className="object-cover"
          src={getImageUrl(src)}
          alt={name || ''}
          fill
          sizes={`${size}px`}
        />
      ) : (
        <UserIcon width={size} height={size} />
      )}
    </div>
  );
}
