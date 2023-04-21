import Head from 'next/head';

import AuthLayout from '@/components/features/Auth/_layout';
import SignupForm from '@/components/features/Auth/Form/SignupForm';
import { NextPageWithLayout } from '../_app';

const Signup: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign In - WatchTree</title>
      </Head>

      <SignupForm />
    </>
  );
};

Signup.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Signup;
