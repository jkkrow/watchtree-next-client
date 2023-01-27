import { PropsWithChildren } from 'react';
import { useMountEffect } from '@react-hookz/web';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '@/hooks/store.hook';

import { getUser, signout } from '@/store/features/user/user.api';

export default function Main({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const refreshTokenExp = useAppSelector((state) => state.user.refreshTokenExp);

  useMountEffect(() => {
    if (!refreshTokenExp) return;

    if (dayjs().isBefore(refreshTokenExp)) {
      dispatch(getUser.initiate());
    } else {
      dispatch(signout.initiate());
    }
  });

  return <main>{children}</main>;
}
