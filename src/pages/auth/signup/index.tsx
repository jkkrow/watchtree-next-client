import Head from 'next/head';

import AuthLayout from '@/components/features/Auth/_layout';
import SignupForm from '@/components/features/Auth/Form/SignupForm';

export default function Singup() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </>
  );
}
