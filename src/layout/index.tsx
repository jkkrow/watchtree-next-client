import dynamic from 'next/dynamic';
import { PropsWithChildren, useEffect } from 'react';
import { Roboto } from '@next/font/google';
import dayjs from 'dayjs';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Curtain from './Curtain';
import Modal from './Modal';
import Notification from './Notification';
import { useMountEffect } from '@/hooks/lifecycle/mount-effect';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useSignoutMutation } from '@/store/features/auth/auth.api';
import { useGetUserQuery } from '@/store/features/user/user.api';
import { setDarkMode } from '@/store/features/settings/settings.slice';

const UploadPopup = dynamic(() => import('./UploadPopup'), { ssr: false });

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  variable: '--font-roboto',
});

export default function Layout({ children }: PropsWithChildren) {
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();
  const refreshTokenExp = useAppSelector((state) => state.user.refreshTokenExp);
  const [signout] = useSignoutMutation();

  useMountEffect(() => {
    dispatch(setDarkMode(darkMode));
  });

  useGetUserQuery(undefined, {
    skip: !refreshTokenExp || dayjs().isAfter(refreshTokenExp),
  });

  useEffect(() => {
    if (refreshTokenExp && dayjs().isAfter(refreshTokenExp)) {
      signout();
    }
  }, [refreshTokenExp, signout]);

  return (
    <div
      className={`${roboto.className} relative flex flex-col min-h-screen text-primary bg-primary selection:bg-inversed selection:text-inversed`}
    >
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Curtain />
      <Modal />
      <Notification />
      <UploadPopup />
    </div>
  );
}
