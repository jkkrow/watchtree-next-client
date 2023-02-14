import { PropsWithChildren } from 'react';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-[100vh selection:bg-black selection:text-white">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
