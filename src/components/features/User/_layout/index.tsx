import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';

import { useAppSelector } from '@/hooks/store';

export default function UserLayout({ children }: PropsWithChildren) {
  const user = useAppSelector((state) => state.user.info);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || user) return;
    router.push('/');
  }, [user, router]);

  return (
    <div className="flex flex-col justify-center items-center max-w-9xl p-6 mx-auto">
      {children}
    </div>
  );
}
