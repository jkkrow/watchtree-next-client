import { PropsWithChildren } from 'react';
import { useMountEffect } from '@react-hookz/web';
import { Roboto } from '@next/font/google';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setDarkMode } from '@/store/features/settings/settings.slice';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
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
      className={`${roboto.className} relative min-h-screen text-primary bg-primary selection:bg-inversed selection:text-inversed`}
    >
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Message />
    </div>
  );
}
