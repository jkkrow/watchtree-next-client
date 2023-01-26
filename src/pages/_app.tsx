import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';

import { wrapper } from '@/store';
import { getUser, signout } from '@/store/features/user/user.api';
import '@/styles/globals.css';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(({ dispatch, getState }) => {
  return async (context) => {
    const props = { pageProps: {} };
    const { credentials } = getState().user;

    if (!credentials) {
      return props;
    }

    if (dayjs().isBefore(credentials.refreshTokenExp)) {
      await dispatch(getUser.initiate());
    } else {
      await dispatch(signout.initiate());
    }

    return props;
  };
});
