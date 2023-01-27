import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';
import Layout from '@/layout';
import '@/styles/globals.css';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props} />
      </Layout>
    </Provider>
  );
}
