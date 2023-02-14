import { PropsWithChildren } from 'react';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
