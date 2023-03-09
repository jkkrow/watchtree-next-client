import Head from 'next/head';

import AuthLayout from '@/components/features/Auth/_layout';
import SigninForm from '@/components/features/Auth/Form/SigninForm';

export default function Signin() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <AuthLayout>
        <SigninForm />
      </AuthLayout>
    </>
  );
}
