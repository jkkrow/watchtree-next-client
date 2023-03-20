import { VideoTreeStatus } from '@/store/features/video/video.type';

import PublicIcon from '@/assets/icons/public.svg';
import PrivateIcon from '@/assets/icons/private.svg';

interface VideoStatusProps {
  status: VideoTreeStatus;
}

export default function VideoStatus({ status }: VideoStatusProps) {
  return (
    <div className="flex items-center gap-1 font-medium">
      <span className="w-6 h-6">
        {status === 'public' ? <PublicIcon /> : <PrivateIcon />}
      </span>
      <span className="capitalize">{status}</span>
    </div>
  );
}
