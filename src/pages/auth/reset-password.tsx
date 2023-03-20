import Head from 'next/head';
import { ReactElement } from 'react';

import AuthLayout from '@/components/features/Auth/_layout';
import ResetPasswordForm from '@/components/features/Auth/Form/ResetPasswordForm';
import { NextPageWithLayout } from '../_app';

const ResetPassword: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>

      <ResetPasswordForm />
    </>
  );
};

ResetPassword.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ResetPassword;
