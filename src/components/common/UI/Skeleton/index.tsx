interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
}

export default function Skeleton({ variant, width, height }: SkeletonProps) {
  const radius = variant === 'circular' ? 'rounded-full' : 'rounded-sm';
  const aspectRatio = variant === 'rectangular' ? 'aspect-video' : '';
  const widthInRem = typeof width === 'number' ? `${width / 16}rem` : width;
  const heightInRem = typeof height === 'number' ? `${height / 16}rem` : height;

  const style = {
    width: widthInRem || '100%',
    height: heightInRem || (variant === 'text' ? '1rem' : '100%'),
  };

  return (
    <div
      className={`relative isolate overflow-hidden bg-secondary ${radius} animate-pulse ${aspectRatio}`}
      style={style}
    />
  );
}
