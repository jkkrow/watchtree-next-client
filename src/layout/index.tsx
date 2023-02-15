import { PropsWithChildren } from 'react';
import { useMountEffect } from '@react-hookz/web';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hook';
import { setDarkMode } from '@/store/features/settings/settings.slice';

export default function Layout({ children }: PropsWithChildren) {
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  useMountEffect(() => {
    dispatch(setDarkMode(darkMode));
  });

  return (
    <div className="min-h-screen text-neutral-900 bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-neutral-100 dark:selection:bg-neutral-100 dark:selection:text-neutral-900">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
