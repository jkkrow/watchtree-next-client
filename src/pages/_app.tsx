import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';
import Layout from '@/layout';
import '@/styles/globals.scss';
import '@/styles/player.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <Layout>{getLayout(<Component {...props} />)}</Layout>
    </Provider>
  );
}
