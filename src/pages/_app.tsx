import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { wrapper, persistor } from '@/store';
import '@/styles/globals.css';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...props} />;
      </PersistGate>
    </Provider>
  );
}
