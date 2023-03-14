import Image from 'next/image';

import { getImageUrl } from '@/utils/image';

interface ImagePreviewProps {
  src: string;
  alt?: string;
}

export default function ImagePreview({ src, alt }: ImagePreviewProps) {
  return (
    <div className="relative inset-0 w-[80vw] max-w-7xl aspect-video bg-transparent">
      <Image
        className="relative object-contain"
        src={getImageUrl(src)}
        alt={alt || ''}
        fill
        priority
      />
    </div>
  );
}
