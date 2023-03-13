import { PropsWithChildren } from 'react';
import { Roboto } from '@next/font/google';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import Modal from './Modal';
import VideoModal from './VideoModal';
import { useMountEffect } from '@/hooks/lifecycle/mount-effect';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setDarkMode } from '@/store/features/settings/settings.slice';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  variable: '--font-roboto',
});

export default function Layout({ children }: PropsWithChildren) {
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  useMountEffect(() => {
    dispatch(setDarkMode(darkMode));
  });

  return (
    <div
      className={`${roboto.className} relative flex flex-col min-h-screen text-primary bg-primary selection:bg-inversed selection:text-inversed`}
    >
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Modal />
      <Message />
      <VideoModal />
    </div>
  );
}
