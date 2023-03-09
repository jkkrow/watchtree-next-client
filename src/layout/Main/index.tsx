import { PropsWithChildren, useEffect } from 'react';
import dayjs from 'dayjs';

import { useAppSelector } from '@/hooks/store';
import { useGetUserQuery } from '@/store/features/user/user.api';
import { useSignoutMutation } from '@/store/features/auth/auth.api';

export default function Main({ children }: PropsWithChildren) {
  const refreshTokenExp = useAppSelector((state) => state.user.refreshTokenExp);
  const [signout] = useSignoutMutation();

  useGetUserQuery(undefined, {
    skip: !refreshTokenExp || dayjs().isAfter(refreshTokenExp),
  });

  useEffect(() => {
    if (refreshTokenExp && dayjs().isAfter(refreshTokenExp)) {
      signout();
    }
  }, [refreshTokenExp, signout]);

  return <main>{children}</main>;
}
