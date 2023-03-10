import Head from 'next/head';

import AuthLayout from '@/components/features/Auth/_layout';
import ResetPasswordForm from '@/components/features/Auth/Form/ResetPasswordForm';

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
}
