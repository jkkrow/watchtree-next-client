import Head from 'next/head';
import { ReactElement } from 'react';

import AuthLayout from '@/components/features/Auth/_layout';
import SignupForm from '@/components/features/Auth/Form/SignupForm';
import { NextPageWithLayout } from '../_app';

const Signup: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <SignupForm />
    </>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Signup;
