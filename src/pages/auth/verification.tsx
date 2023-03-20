import Head from 'next/head';
import { ReactElement } from 'react';

import AuthLayout from '@/components/features/Auth/_layout';
import VerificationForm from '@/components/features/Auth/Form/VerificationForm';
import { NextPageWithLayout } from '../_app';

const Verification: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Verification</title>
      </Head>

      <VerificationForm />
    </>
  );
};

Verification.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Verification;
