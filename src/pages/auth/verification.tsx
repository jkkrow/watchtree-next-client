import Head from 'next/head';

import AuthLayout from '@/components/features/Auth/_layout';
import VerificationForm from '@/components/features/Auth/Form/VerificationForm';
import { NextPageWithLayout } from '../_app';

const Verification: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Verification - WatchTree</title>
      </Head>

      <VerificationForm />
    </>
  );
};

Verification.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Verification;
