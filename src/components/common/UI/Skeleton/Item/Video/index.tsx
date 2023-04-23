import Skeletion from '../..';

export default function VideoSkeleton() {
  return (
    <div>
      <Skeletion variant="rectangular" />
      <div className="flex flex-col py-4 gap-4">
        <Skeletion variant="text" width="70%" />
        <Skeletion variant="text" width="50%" />
      </div>
    </div>
  );
}
