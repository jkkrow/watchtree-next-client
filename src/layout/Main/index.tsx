import { PropsWithChildren } from 'react';
import { useMountEffect } from '@react-hookz/web';
import dayjs from 'dayjs';

import { useAppSelector } from '@/hooks/store';
import {
  useGetUserQuery,
  useSignoutMutation,
} from '@/store/features/user/user.api';

export default function Main({ children }: PropsWithChildren) {
  const refreshTokenExp = useAppSelector((state) => state.user.refreshTokenExp);
  const [signout] = useSignoutMutation();

  useGetUserQuery(undefined, {
    skip: !refreshTokenExp || dayjs().isAfter(refreshTokenExp),
  });

  useMountEffect(() => {
    if (refreshTokenExp && dayjs().isAfter(refreshTokenExp)) {
      signout();
    }
  });

  return <main>{children}</main>;
}
