import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';

import { useAppSelector } from '@/hooks/store';

export default function UploadLayout({ children }: PropsWithChildren) {
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || tree) return;
    router.replace('/user/videos');
  }, [tree, router]);

  return (
    <div className="flex flex-col max-w-9xl p-6 gap-6 mx-auto">
      {tree ? children : null}
    </div>
  );
}
