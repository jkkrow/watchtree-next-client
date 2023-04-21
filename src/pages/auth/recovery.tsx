import Head from 'next/head';

import AuthLayout from '@/components/features/Auth/_layout';
import RecoveryForm from '@/components/features/Auth/Form/RecoveryForm';
import { NextPageWithLayout } from '../_app';

const Recovery: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Recovery - WatchTree</title>
      </Head>

      <RecoveryForm />
    </>
  );
};

Recovery.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Recovery;
