import Skeletion from '../..';

export default function VideoSkeleton() {
  return (
    <div>
      <div className="aspect-video">
        <Skeletion variant="rectangular" />
      </div>
      <div className="flex flex-col py-4 gap-4">
        <Skeletion variant="text" width="70%" />
        <Skeletion variant="text" width="50%" />
      </div>
    </div>
  );
}
