import SkeletionItem from '..';

export default function VideoSkeleton() {
  return (
    <SkeletionItem>
      <div className="flex aspect-video bg-secondary" />
      <div className="flex flex-col p-4 gap-4 [&_div]:bg-secondary [&_div]:rounded-sm">
        <div className="w-3/4 h-4" />
        <div className="w-1/2 h-4" />
      </div>
    </SkeletionItem>
  );
}
