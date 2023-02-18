import { PropsWithChildren } from 'react';
import { useMountEffect } from '@react-hookz/web';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setDarkMode } from '@/store/features/settings/settings.slice';

export default function Layout({ children }: PropsWithChildren) {
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  useMountEffect(() => {
    dispatch(setDarkMode(darkMode));
  });

  return (
    <div className="min-h-screen text-primary bg-primary selection:bg-inversed selection:text-inversed">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
