import VideoTree from '../../Video/TreeView/Tree';
import { useAppSelector } from '@/hooks/store';

export default function UploadPreview() {
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const preview = tree?.root.url;

  return preview ? (
    <div className="z-0 overflow-hidden rounded-md aspect-video">
      <VideoTree tree={tree} autoPlay={false} editMode />
    </div>
  ) : null;
}
