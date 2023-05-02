import Skeletion from '../..';

export default function CarouselSkeleton() {
  return (
    <div className="relative flex w-full max-w-full">
      <div className="w-[1800px] max-w-full opacity-0">
        <Skeletion variant="rectangular" />
      </div>
      <div className="absolute inset-0">
        <Skeletion width="100%" height="100%" />
      </div>
    </div>
  );
}
