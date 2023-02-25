import Image from 'next/image';
import UserIcon from '@/assets/icons/user.svg';

interface AvatarProps {
  src: string;
  name?: string;
  width: number;
  height: number;
}

export default function Avatar({ src, name, width, height }: AvatarProps) {
  return (
    <div>
      {src ? (
        <Image src={src} alt={name || ''} width={width} height={height} />
      ) : (
        <UserIcon width={width} height={height} />
      )}
    </div>
  );
}
