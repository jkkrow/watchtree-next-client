import Image from 'next/image';
import UserIcon from '@/assets/icons/user.svg';

interface AvatarProps {
  src: string;
  name?: string;
  size: number;
}

export default function Avatar({ src, name, size }: AvatarProps) {
  const assetDomain = process.env.NEXT_PUBLIC_ASSET_DOMAIN;
  const imgUrl = src.startsWith('http') ? src : `${assetDomain}/${src}`;

  return (
    <div className="rounded-full overflow-hidden">
      {src ? (
        <Image src={imgUrl} alt={name || ''} width={size} height={size} />
      ) : (
        <UserIcon width={size} height={size} />
      )}
    </div>
  );
}
