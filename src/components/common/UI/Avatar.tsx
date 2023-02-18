import Image from 'next/image';

import UserIcon from '@/assets/icons/user.svg';

interface AvatarProps {
  src: string;
  name?: string;
}

export default function Avatar({ src, name }: AvatarProps) {
  return (
    <div className="w-full h-full">
      {src ? <Image src={src} alt={name || ''} fill /> : <UserIcon />}
    </div>
  );
}
