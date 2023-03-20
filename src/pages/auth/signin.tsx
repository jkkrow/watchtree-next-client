import Head from 'next/head';
import { ReactElement } from 'react';

import AuthLayout from '@/components/features/Auth/_layout';
import SigninForm from '@/components/features/Auth/Form/SigninForm';
import { NextPageWithLayout } from '../_app';

const Signin: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <SigninForm />
    </>
  );
};

Signin.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Signin;
